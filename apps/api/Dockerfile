# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Prisma sur Alpine a souvent besoin d'OpenSSL + compat libc
RUN apk add --no-cache openssl libc6-compat

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy workspace files
COPY apps/api/package.json ./apps/api/
COPY packages/common/package.json ./packages/common/

# Install dependencies
RUN npm install --ignore-scripts

# Copy source files
COPY apps/api ./apps/api
COPY packages ./packages

# Generate Prisma client
WORKDIR /app/apps/api
RUN npm run db:generate

# Build
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Runtime Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy built files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./node_modules

# Expose port
EXPOSE 4000

# Start
CMD ["node", "dist/index.js"]

