import jwt from "jsonwebtoken";

// Middleware to fetch user details from JWT token
const fetchUser = async (req, res, next) => {
    // checking if the token is valid send through header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    try {
        // get the user id from the token and add it to req object
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}

export default fetchUser;