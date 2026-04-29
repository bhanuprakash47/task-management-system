import jwt from "jsonwebtoken"
import User from "../models/User.js"

const secretKey = process.env.JWT_SECRET_KEY

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: "Access Denied" });
    }

    const [scheme, token] = authHeader.split(" ")
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid authorization format" })
    }

    try {
        if (!secretKey) {
            return res.status(500).json({ error: "JWT_SECRET_KEY not configured" })
        }

        const verified = jwt.verify(token, secretKey)
        const user = await User.findByPk(verified.id)

        if (!user) {
            return res.status(401).json({ error: "User not found. Please login again." })
        }

        req.user = { id: user.id, email: user.email }
        next()
    } catch (_err) {
        return res.status(401).json({ error: "Invalid Token" })
    }
};

export default verifyToken