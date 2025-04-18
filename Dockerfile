FROM node:22-alpine AS builder

ARG DATABASE_URL=file:./prod.db
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm run db:migrate

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prod.db /app/prod.db

EXPOSE 3000
CMD ["node", "build/index.js"]
