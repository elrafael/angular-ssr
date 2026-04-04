# Estágio 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Aproveita cache do Docker — só reinstala se package*.json mudar
RUN npm ci

# Copia o código e faz o build de produção
COPY . .
RUN npm run build

# Estágio 2: Runtime
FROM node:22-alpine
WORKDIR /app

# Copia apenas os artefactos necessários do estágio de build
COPY --from=build /app/dist/angular-ssr /app/dist/angular-ssr

# Expomos a porta 4000 que é o padrão do Angular SSR
EXPOSE 4000
ENV PORT=4000
ENV NODE_ENV=production

# Inicia o servidor Angular SSR
CMD ["node", "dist/angular-ssr/server/server.mjs"]
