import express from "express"
import sequelize from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "API is running" })
})

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" })
})

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connected")

    await import("./models/index.js")

    await sequelize.sync() 

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("DB connection error:", err.message)
  }
}

startServer()