import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
// import logo from '../../public/logo.jpg'
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // console.log(user)
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50 bg-white/80 backdrop-blur-md">

      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-gray-800 cursor-pointer">
          <img className="w-10 h-10 rounded-xl" src="/logo.jpg" />
          DevHub
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-5 relative" ref={dropdownRef}>

          {/* Premium Badge */}
          {user.isPremium && (
            <div className="relative group">
              <FaCheckDouble className="text-blue-600 text-lg cursor-pointer" />
              
              {/* Tooltip */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 
              bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
              group-hover:opacity-100 transition whitespace-nowrap">
                Premium User
              </span>
            </div>
          )}

          {/* Greeting */}
          <span className="hidden sm:block text-gray-600 font-medium">
            Hi, {user.firstName}
          </span>

          {/* Avatar */}
          <img
            src={user.photoURL}
            className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li><Link className="block px-4 py-2 hover:bg-gray-100" to="/profile">Profile</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100" to="/connections">Connections</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100" to="/requests">Requests</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100" to="/premium">Premium</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
