import React from "react";
import { Link } from "react-router-dom";
import { FaCheckDouble, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
const Footer = () => {
  const user = useSelector((store) => store.user);

  return (
    <footer className="bg-base-300 text-neutral-content px-6 py-10 mt-auto">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold">DevHub</h2>
          <p className="mt-2 text-sm opacity-80">
            Connect with developers, collaborate on projects, and build your
            network.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              {!user ? (
                <span className="opacity-50 cursor-not-allowed">Home</span>
              ) : (
                <Link to="/" className = 'hover:underline cursor-pointer'>Home</Link>
              )}
            </li>
            <li>
              {!user ? (
                <span className="opacity-50 cursor-not-allowed">Connections</span>
              ) : (
                <Link to="/connections" className = 'hover:underline cursor-pointer'>Connections</Link>
              )}
            </li>
            <li>
              {!user ? (
                <span className="opacity-50 cursor-not-allowed">Profile</span>
              ) : (
                <Link to="/profile" className = 'hover:underline cursor-pointer'>Profile</Link>
              )}
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/rohit-chugh14/"
              target="_blank"
              className="hover:text-white cursor-pointer"
            >
              <FaLinkedin className="cursor-pointer hover:text-white" />
            </a>
            <a
              href="https://github.com/Rohit-GHacc/dev-tinder-frontend"
              target="_blank"
              className="hover:text-white cursor-pointer text-white"
            >
              <FaGithub className="cursor-pointer hover:text-white" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              className="hover:text-white cursor-pointer"
            >
              <FaTwitter className="cursor-pointer hover:text-white" />
            </a>
            
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-8 opacity-70">
        © {new Date().getFullYear()} DevTinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
