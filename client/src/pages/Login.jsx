import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/apiEndPoint";
import { useUser } from "../utils/context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // hook
  const { setUser, setIsLoggedIn, setUserChannelId } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Logging in with:", formData);

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // {message: 'Welcome back, raj', user: {username: 'raj'}, success: true, channelId: '682f005bd02635f1660dc2f8'}
      // console.log("Data ", response.data);

      if (response.data.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        setUserChannelId(response.data.channelId);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="h-8"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-1">Sign in</h2>
        <p className="text-sm text-gray-600 mb-6">to continue to YouTube</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              to="/register"
              type="button"
              className="text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded"
            >
              Create account
            </Link>

            <button
              type="submit"
              className="bg-blue-600 text-white font-medium cursor-pointer px-6 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
