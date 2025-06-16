import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/usersignup.js"; // make sure this is correct
const JWT_SECRET = "your_jwt_secret"; // or use env variable

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email,
        user_id: user.user_id, // ✅ include it in the payload
      },
      JWT_SECRET,
      {
        expiresIn: "14d", // ✅ token valid for 14 days
      }
    );

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default login;
