# Stage 1
FROM node:20-alpine AS node-base
 
FROM node-base AS node-builder

WORKDIR /app
 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN corepack prepare --activate pnpm@latest

COPY webapp .

RUN pnpm install

RUN pnpm run webapp:build

 
# Stage 2
FROM python:3-alpine AS python-base

FROM python-base as python-builder
 
WORKDIR /app
 
RUN python3 -m venv .venv
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
 
COPY --from=node-builder /app/@beta-lyfe/webapp/dist static
COPY backend/templates templates
RUN cp static/index.html templates/index.html

COPY backend/requirements.txt .
RUN pip install -r requirements.txt
# RUN python3 manage.py collectstatic --noinput


# Stage 3
FROM python-base AS python-runner
 
WORKDIR /app
 
COPY --from=python-builder /app/.venv .venv
COPY backend .
COPY --from=python-builder /app/static static
COPY --from=python-builder /app/templates templates
 
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PORT=8000
 
EXPOSE ${PORT}

ENTRYPOINT gunicorn --bind :${PORT} backend.wsgi
