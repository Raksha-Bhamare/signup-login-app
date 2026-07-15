import { useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import "./App.css";

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <div className="mt-6">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={handleLogin}
            className="text-blue-600 font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;