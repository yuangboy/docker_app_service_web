// Création d'un utilisateur pour l'application
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'app');

// Créer un utilisateur avec des droits limités
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE || 'app'
    }
  ]
});

// Créer des index pour de meilleures performances
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

db.createCollection('sessions');
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Insertion de données de démonstration (optionnel)
db.settings.insertOne({
  _id: 'app_config',
  appName: 'Mon App FullStack',
  version: '1.0.0',
  features: {
    mongodb: true,
    postgresql: true
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB initialisé avec succès !');