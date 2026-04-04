import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 Prevent UI flicker
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main content */}
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;