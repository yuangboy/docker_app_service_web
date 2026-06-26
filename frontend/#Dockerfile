# Build stage - Ubuntu 22.04 LTS
# FROM ubuntu:22.04 AS builder
FROM node:20 AS builder

# Éviter les interactions interactives
# ENV DEBIAN_FRONTEND=noninteractive

# Installer Node.js 18 depuis le dépôt officiel
# RUN apt-get update && apt-get install -y \
#     curl \
#     ca-certificates \
#     gnupg \
#     && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
#     && apt-get install -y nodejs \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY postcss.config.mjs ./
# RUN npm ci --only=production

COPY . .
# RUN npm run build
# Variable d'environnement pour Tailwind v4
ENV NODE_OPTIONS="--max-old-space-size=4096"
CMD ["npm", "run", "dev"]

# Build avec nettoyage du cache
# RUN rm -rf .next .cache
# RUN npm run build

# Production stage
# FROM ubuntu:22.04
# FROM node:20

# ENV DEBIAN_FRONTEND=noninteractive
# ENV NODE_ENV=production

# Installer Node.js et outils nécessaires
# RUN apt-get update && apt-get install -y \
#     curl \
#     nodejs \
#     npm \
#     tzdata \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur non-root
# RUN groupadd -r nodejs && useradd -r -g nodejs -m -s /bin/bash nodejs

# WORKDIR /app

# Copier les fichiers depuis le builder
# COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next
# COPY --from=builder --chown=nodejs:nodejs /app/public ./public
# COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
# COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# USER nodejs

# EXPOSE 3000

# Utiliser un script de démarrage pour une meilleure gestion des signaux
# COPY --chown=nodejs:nodejs start.sh .
# RUN chmod +x start.sh

# CMD ["sh","./start.sh"]