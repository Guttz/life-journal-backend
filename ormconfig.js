module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  migrationsTableName: "migrations",
  entities: [
    "./db/entity/*.ts"
  ],
  migrations: [
     "db/migrations/**/*.ts"
  ],
  subscribers: [
     "db/subscribers/**/*.ts"
  ],
  cli: {
     "entitiesDir": "./db/entity",
     "migrationsDir": "db/migrations",
     "subscribersDir": "db/subscribers"
  }
}