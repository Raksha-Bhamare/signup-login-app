const connectDB = require("../backend/db");
const User = require("../backend/User");

module.exports = async (req, res) => {
  try {
    await connectDB();

    if (req.method === "POST" && req.url.includes("/signup")) {
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
    }

    if (req.method === "POST" && req.url.includes("/login")) {
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
    }

    return res.status(404).json({
      message: "Route not found",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};