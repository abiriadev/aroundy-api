FROM node:20.15.1-alpine3.20 AS builder

WORKDIR /src

# copy dependency files
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# copy prisma schema
COPY prisma ./prisma

# gnenerate prisma client and type definitions
RUN ["pnpm", "run", "prisma:generate"]

# copy source code
COPY nest-cli.json tsconfig.json ./
COPY src/ ./src/

# build the nest app
RUN pnpm build \
	&& pnpm prune --prod

FROM node:20.15.1-alpine3.20 AS runner

# create a non-root user
USER node
WORKDIR /home/node

# copy build artifacts from the builder stage
COPY --from=builder --chown=node:node /src/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /src/dist/src ./

ENV NODE_ENV=production

CMD ["node", "./main.js"]
