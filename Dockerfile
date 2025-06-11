# Stage 1: Build
FROM node:20-alpine AS builder

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory inside container
WORKDIR /app

# Copy only necessary files first for better caching
COPY pnpm-lock.yaml package.json ./

# Install all dependencies (workspace-aware)
RUN pnpm install --frozen-lockfile

# Copy the monorepo (or entire repo)
COPY . .

# Go into the specific backend package
WORKDIR /app/apps/backend

# Build the backend
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine AS runner

# Enable pnpm again
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy the whole monorepo again for runtime (to include node_modules and build artifacts)
COPY --from=builder /app .

# Set the working directory to your backend package
WORKDIR /app/apps/backend

# Set environment variable (optional)
ENV NODE_ENV=production

# Expose your backend port
EXPOSE 3000

# Start the backend
CMD ["pnpm", "start"]
