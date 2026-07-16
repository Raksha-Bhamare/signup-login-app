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

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    return res.status(200).json({
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
