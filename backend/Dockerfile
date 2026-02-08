# -----------------------------
# 1) Build stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# On copie uniquement le code source
COPY src ./src
COPY tsconfig*.json ./

RUN npm run build

# -----------------------------
# 2) Production stage
# -----------------------------
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY ormconfig ./ormconfig
COPY entrypoint.sh .

ENTRYPOINT ["sh", "entrypoint.sh"]
