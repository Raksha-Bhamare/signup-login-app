import connectDB from "../backend/db.js";
import User from "../backend/user.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method not allowed",
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    await new User({
      name,
      email,
      password,
    }).save();

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
