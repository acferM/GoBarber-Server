module.exports = [
  {
    "url": process.env.DATABASE_URL,
    "name": "default",
    "type": "postgres",
    "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gostack_mongo",
    "useUnifiedTopology": true,
    "entities": [
      "./dist/modules/**/infra/typeorm/schemas/*.js"
    ]
  }
]
