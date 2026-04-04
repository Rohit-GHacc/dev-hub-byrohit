import { useEffect, useState } from "react";
import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import MotionBg from "./MotionBg";
const Connections = () => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const res = await api.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-linear-to-br from-blue-50 to-gray-100">
        <MotionBg />
        <h2 className="text-2xl font-semibold text-gray-700">
          No connections yet
        </h2>
        <p className="text-gray-500 mt-2">Start connecting with people 🚀</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-blue-50 to-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Connections
        </h1>
        <MotionBg />
        {/* List */}
        <div className="flex flex-col gap-4 ">
          {connections.map((c) => (
            <div
              key={c._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition z-100"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden border">
                  <img
                    src={c.photoURL}
                    alt={c.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {c.firstName} {c.lastName}
                  </span>

                  {c.age && c.gender && (
                    <span className="text-sm text-gray-500">
                      {c.age} • {c.gender}
                    </span>
                  )}

                  {c.about && (
                    <span className="text-sm text-gray-600 line-clamp-1">
                      {c.about}
                    </span>
                  )}
                </div>
              </div>

              {/* Chat Button */}
              <Link to={`/app/chat/${c._id}`}>
                <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm cursor-pointer">
                  {/* SVG Chat Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
