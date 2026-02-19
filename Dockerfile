# Estágio 1: Build (Onde a mágica do Angular acontece)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos apenas os ficheiros de dependências primeiro para aproveitar a cache do Docker
COPY package*.json ./
RUN npm ci

# Copiamos o resto do código e fazemos o build
COPY . .
RUN npm run build

# Estágio 2: Runtime (A versão leve que vai para o Azure)
FROM node:20-alpine
WORKDIR /app

# Copiamos a pasta 'dist' gerada no estágio anterior
# NOTA: Confirma se o nome da pasta é 'angular-ssr' dentro de dist/
COPY --from=build /app/dist/angular-ssr /app/dist/angular-ssr

# Expomos a porta 4000 que é o padrão do Angular SSR
EXPOSE 4000

# Variável de ambiente para garantir que o Node sabe que porta usar (opcional, mas boa prática)
ENV PORT=4000

# O comando que inicia o servidor SSR
CMD ["node", "dist/angular-ssr/server/server.mjs"]
