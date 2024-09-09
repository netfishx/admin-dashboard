FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN corepack enable && corepack prepare pnpm --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    # --mount=type=bind,source=.npmrc,target=.npmrc \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch

COPY . .
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# COPY .env.production.sample .env.production
RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOST=http://192.168.50.229:8088
# ENV HOSTNAME=localhost

CMD ["node", "server.js"]
