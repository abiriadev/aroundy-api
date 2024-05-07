FROM node:20.12.2-alpine3.19 as builder

WORKDIR /src

COPY package.json pnpm-lock.yaml ./

RUN corepack enable \
	&& pnpm install --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src/ ./src/

RUN pnpm build \
	&& pnpm prune --prod

FROM node:20.12.2-alpine3.19 as runner

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /src/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /src/dist/ ./

ENV NODE_ENV production

CMD ["node", "main.js"]
