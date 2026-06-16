#!/bin/bash

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "🔄 Début des sauvegardes..."

# Backup PostgreSQL
echo "📦 Backup PostgreSQL..."
docker exec app-postgres-ubuntu pg_dump -U appuser appdb > $BACKUP_DIR/postgres_backup.sql

# Backup MongoDB
echo "📦 Backup MongoDB..."
docker exec app-mongodb-ubuntu mongodump --username admin --password SecureMongoP@ss2024! --authenticationDatabase admin --db appdb --out /tmp/backup
docker cp app-mongodb-ubuntu:/tmp/backup $BACKUP_DIR/mongodb_backup

# Backup Redis
echo "📦 Backup Redis..."
docker exec app-redis-ubuntu redis-cli --pass SecureRedisP@ss2024! SAVE
docker cp app-redis-ubuntu:/data/dump.rdb $BACKUP_DIR/redis_backup.rdb

echo "✅ Sauvegardes terminées dans $BACKUP_DIR"