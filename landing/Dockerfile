FROM oven/bun:1-slim AS base

ENV NODE_ENV=production
WORKDIR /src

FROM base AS deps


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lock,target=bun.lock \
    --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

FROM base AS prod

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lock,target=bun.lock \
    --mount=type=cache,target=/root/.bun \
    bun install --production --frozen-lockfile

FROM deps AS build

COPY . .

RUN --mount=type=cache,target=/root/.bun bun run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /src/dist /usr/share/nginx/html
COPY --from=build /src/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80