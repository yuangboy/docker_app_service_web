#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <backup_directory>"
    exit 1
fi

BACKUP_DIR=$1

echo "🔄 Restauration MongoDB depuis $BACKUP_DIR..."

docker cp $BACKUP_DIR/mongodb_backup/appdb app-mongodb-ubuntu:/tmp/restore
docker exec app-mongodb-ubuntu mongorestore --username admin --password SecureMongoP@ss2024! --authenticationDatabase admin --db appdb --drop /tmp/restore

echo "✅ MongoDB restauré avec succès !"