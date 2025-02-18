import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // if we have not token then navigate to login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      navigate("/homepage");
    }
  }, [navigate]);
  // handle login data
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // handle the  submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL,
        loginData
      );
      //check if valid user then navigate to home page otherwise alert invalid user
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/homepage");
      }
      // reset login state data
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
      alert("Invalid User");
    }
  };

  return (
    <div className="py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-2xl flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <form
                className="flex flex-col gap-4 pb-4"
                onSubmit={handleSubmit}
              >
                <h1 className="mb-4 text-2xl font-bold text-black text-center">
                  Login
                </h1>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-medium" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="block w-full border  border-gray-300 p-2.5 text-sm rounded-lg"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="block w-full border  border-gray-300 p-2.5 text-sm rounded-lg"
                    id="password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="********"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="border transition-colors focus:ring-2 p-2 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-lg"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
