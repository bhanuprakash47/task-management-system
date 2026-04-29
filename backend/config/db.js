import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    "Database URL missing. Set DATABASE_URL in backend/.env"
  )
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
})

export default sequelize