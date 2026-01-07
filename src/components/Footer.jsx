import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { theme } = useContext(AuthContext);

  return (
    <footer
      className={`mt-16 ${
        theme === "light"
          ? "bg-zinc-300 text-slate-800"
          : "bg-zinc-900/80 text-slate-300"
      } backdrop-blur-md`}
    >
      <div className="w-11/12 mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Website */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-blue-700">HomeNest</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Find your perfect home with trusted listings, transparent pricing,
            and verified property details.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@homenest.com</li>
            <li>Phone: +880 1799-666666</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-700 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-700 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-blue-700 text-white hover:scale-110 transition-transform"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-blue-700 text-white hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-blue-700 text-white hover:scale-110 transition-transform"
            >
              <FaXTwitter></FaXTwitter>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-blue-700 text-white hover:scale-110 transition-transform"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`text-center py-4 text-sm border-t ${
          theme === "light" ? "border-slate-200" : "border-zinc-700"
        }`}
      >
        © {new Date().getFullYear()} PropertyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
