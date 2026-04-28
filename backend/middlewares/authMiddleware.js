// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get the token from the request headers
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: "Access Denied" });

    try {
        // 2. Verify the token using your secret key
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        // 3. Attach the user data (like their ID) to the request
        req.user = verified;
        next(); // Move to the actual route handler
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
  }
};

export default verifyToken