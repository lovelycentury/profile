# syntax=docker/dockerfile:1.7
#
# @okkly/profile — Next.js App Router site, server-rendered, i18n via next-intl.
#
#   docker build -t profile .
#   docker run -p 5200:5200 profile
#
# Relies on Next's standalone output (next.config.ts -> output: "standalone"):
# the runtime image carries only the traced server plus its own node_modules,
# not the full workspace.

FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    CI="true"
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm fetch

FROM deps AS build
COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline
ENV NEXT_TELEMETRY_DISABLED="1"
RUN pnpm run build

FROM node:22-slim AS runtime
ENV NODE_ENV="production" \
    NEXT_TELEMETRY_DISABLED="1" \
    PORT="5200" \
    HOSTNAME="0.0.0.0"
WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone server bundle first, then the assets it does not inline.
COPY --from=build --chown=nextjs:nodejs /repo/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /repo/public ./public

USER nextjs
EXPOSE 5200

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||5200)).then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
