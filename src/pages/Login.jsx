import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // 🔹 Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(from);
      })
      .catch((error) => toast.error(error.code));
  };

  // 🔹 Google Login
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSignIn()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from);
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse ml-0 lg:ml-20">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Step into the green world! Learn about indoor plants, nurture your
              passion, and get expert consultation to grow beautifully.
            </p>
          </div>

          <div className="card bg-black/40 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                  <label className="label font-bold text-[15px]">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    name="email"
                    ref={emailRef}
                    required
                  />

                  <label className="label font-bold text-[15px]">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={show ? "text" : "password"}
                      className="input w-full pr-12 relative z-10"
                      placeholder="Password"
                      name="password"
                      required
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-gray-600"
                    >
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <div className="border border-gray-700 my-5"></div>

                  <button
                    type="submit"
                    className="btn btn-neutral bg-black/50 border-none"
                  >
                    Login
                  </button>
                </fieldset>
              </form>
              <div className="flex items-center my-0">
                <div className="grow border-t border-gray-500"></div>
                <span className="mx-3 text-sm text-gray-400">OR</span>
                <div className="grow border-t border-gray-500"></div>
              </div>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-white mt-1"
              >
                <FcGoogle className="text-xl" />
                Google sign-in
              </button>
              <p className="text-center mt-1 text-sm">
                Don't have any account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
