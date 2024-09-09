FROM imbios/bun-node:1-20-alpine AS base

WORKDIR /app

FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lockb,target=bun.lockb \
    --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOST=http://192.168.50.229:8088
# ENV HOSTNAME=localhost

CMD ["node", "server.js"]
