import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Email validation
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegEx.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    // Password validation
    const passRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegEx.test(password)) {
      return toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase letters"
      );
    }

    createUser(email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName,
          photoURL,
        });
      })
      .then(() => {
        toast.success("Account created successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Signed up with Google successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse ml-0 lg:ml-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Be part of our growing property community and begin your journey
            toward smarter and more comfortable living.
          </p>
        </div>

        <div className="card bg-black/40 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                {/* Name */}
                <label className="label font-bold text-[15px]">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  placeholder="Name"
                  required
                />

                {/* Email */}
                <label className="label font-bold text-[15px]">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                  required
                />

                {/* Photo */}
                <label className="label font-bold text-[15px]">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input w-full"
                  placeholder="Photo URL"
                />

                {/* Password */}
                <label className="label font-bold text-[15px]">Password</label>
                <div className="relative w-full">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="input w-full pr-12"
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                  >
                    {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </span>
                </div>

                <button className="btn btn-neutral bg-black/50 border-none mt-4">
                  Sign up
                </button>
              </fieldset>
            </form>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="grow border-t border-gray-500"></div>
              <span className="mx-3 text-sm text-gray-400">OR</span>
              <div className="grow border-t border-gray-500"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-white w-full"
            >
              <FcGoogle className="text-xl" />
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-3 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
