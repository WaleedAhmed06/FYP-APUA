import { useState } from "react";
import logo from "../assets/image/green-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axiosInstance";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    navigate("/dashboard");
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      // You can save token here if needed:
      localStorage.setItem("token", response.data.token);

      // Navigate only on success
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-30 shadow-lg rounded-xl p-6 w-full max-w-sm">
        <img src={logo} alt="Logo" className="mx-auto" />
        <p className="text-sm text-gray-500 my-6 text-center">
          Login To Automated Platform for Undergraduate Admissions
        </p>

        {error && (
          <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Phone
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-green-500 text-sm cursor-pointer"
              >
                {showPassword ? "hide" : "show"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-green-500 hover:underline focus:outline-none"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
