# Stage 2
FROM python:3-alpine AS python-base

FROM python-base AS python-builder

WORKDIR /app

RUN python3 -m venv .venv
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN apk add postgresql16
COPY requirements.txt .
RUN pip install -r requirements.txt

# Stage 3
FROM python-base AS python-runner

WORKDIR /app

COPY --from=python-builder /app/.venv .venv
COPY . .

ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

ARG PORT
ARG SECRET_KEY
ARG APP_ENV
ARG CLOUD_NAME
ARG CLOUD_API_KEY
ARG CLOUD_API_SECRET
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG DB_HOST
ARG DB_PORT
ARG EMAIL_HOST_USER
ARG EMAIL_HOST_PASSWORD
ARG STAGE

RUN python3 manage.py collectstatic

EXPOSE ${PORT}

ENTRYPOINT ["./scripts/entrypoint.sh"]
