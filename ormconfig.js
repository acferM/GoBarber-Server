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
<<<<<<< HEAD
  // {
  //   "url": process.env.MONGODB_URL,
  //   "name": "mongo",
  //   "type": "mongodb",
  //   "useUnifiedTopology": true,
  //   "entities": [
  //     "./dist/modules/notifications/infra/typeorm/schemas/**/*.js"
  //   ]
  // }
=======
  {
    "url": process.env.MONGODB_URL,
    "name": "mongo",
    "type": "mongodb",
    "useUnifiedTopology": true,
    "entities": [
      "./dist/modules/notifications/infra/typeorm/schemas/**/*.js"
    ]
  }
>>>>>>> 9e3ccd53bca2a79abc5411a5cd96383948b88002
]
