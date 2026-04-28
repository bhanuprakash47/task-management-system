import express from "express"
import sequelize from "./config/db.js"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connected")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("DB connection error:", err.message)
  }
}

startServer()