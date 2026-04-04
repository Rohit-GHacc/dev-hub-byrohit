import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
const Footer = () => {
  const user = useSelector((store) => store.user);

  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-10 mt-auto">
  <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">

    {/* Branding */}
    <div>
      <h2 className="text-2xl font-bold text-gray-800">DevHub</h2>
      <p className="mt-2 text-sm text-gray-600">
        Connect with developers, collaborate on projects, and build your network.
      </p>
    </div>

    {/* Links */}
    <div>
      <h3 className="font-semibold mb-3 text-gray-800">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li>
          {!user ? (
            <span className="text-gray-400 cursor-not-allowed">Home</span>
          ) : (
            <Link to="/app/feed" className="text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
          )}
        </li>
        <li>
          {!user ? (
            <span className="text-gray-400 cursor-not-allowed">Connections</span>
          ) : (
            <Link to="/app/connections" className="text-gray-600 hover:text-blue-600 transition">
              Connections
            </Link>
          )}
        </li>
        <li>
          {!user ? (
            <span className="text-gray-400 cursor-not-allowed">Profile</span>
          ) : (
            <Link to="/app/profile" className="text-gray-600 hover:text-blue-600 transition">
              Profile
            </Link>
          )}
        </li>
      </ul>
    </div>

    {/* Socials */}
    <div>
      <h3 className="font-semibold mb-3 text-gray-800">Connect</h3>
      <div className="flex gap-4 text-xl">

        <a
          href="https://www.linkedin.com/in/rohit-chugh14/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-blue-600 transition"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/Rohit-GHacc/dev-hub-byrohit"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-blue-600 transition"
        >
          <FaGithub />
        </a>

        <a
          href="https://x.com/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-blue-600 transition"
        >
          <FaTwitter />
        </a>

      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="text-center text-sm mt-10 text-gray-500">
    © {new Date().getFullYear()} DevHub. All rights reserved.
  </div>
</footer>
  );
};

export default Footer;
