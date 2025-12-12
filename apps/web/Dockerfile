# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy workspace files
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source files
COPY apps/web ./apps/web

# Build
WORKDIR /app/apps/web
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./
COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./node_modules

# Expose port
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Start
CMD ["npm", "run", "start"]

