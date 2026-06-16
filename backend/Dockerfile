# Build stage
# FROM ubuntu:22.04 AS builder
FROM node:20 AS builder

# ENV DEBIAN_FRONTEND=noninteractive/

# Installer Node.js et outils de build
# RUN apt-get update && apt-get install -y \
#     curl \
#     ca-certificates \
#     gnupg \
#     build-essential \
#     python3 \
#     && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
#     && apt-get install -y nodejs \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*




WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# RUN npm run build
CMD ["npm", "run", "start:dev"]

# Production stage
# FROM ubuntu:22.04

# Production stage
# FROM node:20


# ENV DEBIAN_FRONTEND=noninteractive
# ENV NODE_ENV=production

# Installer Node.js seulement (pas les outils de build)
# RUN apt-get update && apt-get install -y \
#     curl \
#     ca-certificates \
#     nodejs \
#     npm \
#     tzdata \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*



# Créer un utilisateur non-root
# RUN groupadd -r nodejs && useradd -r -g nodejs -m -s /bin/bash nodejs

# Créer un utilisateur non-root (avec les commandes compatibles Alpine)
# RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Créer un utilisateur non-root (compatible avec les images basées sur Debian/Ubuntu)
# RUN groupadd -r nodejs && useradd -r -g nodejs nodejs



# WORKDIR /app

# # Copier les fichiers
# COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
# COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# USER nodejs

# EXPOSE 3001

# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#     CMD curl -f http://localhost:3001/health || exit 1

# CMD ["node", "dist/main"]