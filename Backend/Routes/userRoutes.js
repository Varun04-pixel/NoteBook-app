import express from "express";
import User from "../DataBase/Models/User.js";
import expressvalidator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../Middleware/fetchUser.js";

const { body, validationResult } = expressvalidator;
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await User.find();
  res.send(data);
});

// Create a new user
userRouter.post(
  "/createuser",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { username, email, password } = req.body;
    // Checks if user with this email already exists
    try {
      const data = await User.findOne({ email });
      if (data) {
        return res
          .status(400)
          .json({ errors: "User with this email already exists" });
      }
      // Hashing the password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = await User.create({ username, email, password: secPass });
      // Payload for JWT
      const jwtData = {
        user: {
          id: newUser._id,
        },
      };
      // Generates JWT token
      const authToken = jwt.sign(jwtData, process.env.JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Login a user
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      // Check if user with this email exists
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }
      // Check if password matches the actual password
      const passwordCompare = await bcrypt.compare(password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }
      // Payload for JWT
      const jwtData = {
        user: {
          id: userData._id,
        },
      };
      // Generates JWT token
      const authToken = jwt.sign(jwtData, process.env.JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Fetches details of logged in user
userRouter.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default userRouter;
