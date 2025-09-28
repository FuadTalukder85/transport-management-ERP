import React, { useContext } from "react";
import bgImage from "../../assets/bannerImg.jpeg";
import ReusableForm from "./ReusableForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { email, password } = data;
    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      alert(result.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/banner.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="md:px-40 h-screen flex items-center justify-center bg-gray-300"
    >
      <div className="md:flex justify-between">
        {/* form */}
        <div className="flex items-center justify-center md:w-1/2 bg-white py-7 md:p-8  rounded-l-xl">
          <div className="p-5 md:p-7">
            <h2 className="text-2xl font-semibold text-[#11375B]">
              Transport Management
            </h2>
            <p className="text-secondary font-medium">
              Transportation Solution
            </p>
            <ReusableForm onSubmit={handleLogin}>
              <div className="mt-7">
                <label htmlFor="" className="text-secondary font-semibold">
                  Enter Email Address*
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="" className="text-secondary font-semibold">
                  Enter Email Password*
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md outline-none"
                  required
                />
              </div>
            </ReusableForm>

            <div className="mt-4 text-right">
              {/* <Link to="/ResetPass"> */}
              <span className="font-semibold text-secondary underline hover:text-red-500 transition-all duration-700 cursor-pointer">
                Forget password?
              </span>
              {/* </Link> */}
            </div>
          </div>
        </div>
        {/* img */}
        <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
          <img src={bgImage} alt="" className="w-full h-full rounded-r-xl" />
        </div>
      </div>
    </div>
  );
};

export default Login;
