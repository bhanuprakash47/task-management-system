import dns from "dns"
dns.setDefaultResultOrder("ipv4first")

import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in environment variables")
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

export default sequelize