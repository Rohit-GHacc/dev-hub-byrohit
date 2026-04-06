import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";

const UserCard = ({ user, isFeed = false }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = user.images.length ? user.images : [];

  const handleStatus = async (status, userId) => {
    try {
      const loadingToast = toast.loading("Processing...");

      await api.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );

      toast.dismiss(loadingToast);

      if (status === "interested") {
        toast.success(`You showed interest in ${user?.firstName} 💙`);
      } else {
        toast(`You skipped ${user?.firstName}`, { icon: "👋" });
      }

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % user.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + user.images.length) % user.images.length,
    );
  };
  return (
    <div className="flex justify-center px-4 py-6 sm:py-8">
      <motion.div
        {...(isFeed && { drag: "x" })}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (!isFeed) return;

          if (info.offset.x > 120) {
            handleStatus("interested", user?._id);
          } else if (info.offset.x < -120) {
            handleStatus("ignored", user?._id);
          }
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileDrag={isFeed ? { scale: 1.05 } : {}}
        transition={{ duration: 0.3 }}
        // 🔥 FIXED SIZE (key part)
        className="w-[320px] sm:w-85 h-150 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col"
      >
        {/* IMAGE (ALWAYS FIXED) */}
        <div className="relative w-full h-[60%] overflow-hidden rounded-t-2xl">
          {/* Image */}
          <img
            src={images.length ? images[currentIndex] : 'https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg'}
            alt="user"
            className="w-full h-full object-cover transition duration-300"
          />

          {images.length > 1 && (
            <>
            {/* left arrow */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                ←
              </button>
              {/* right arrow */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {user?.firstName} {user?.lastName}
          </h2>

          {user?.age && user?.gender && (
            <p className="text-sm text-gray-500">
              {user.age} • {user.gender}
            </p>
          )}

          {/* FIXED TEXT AREA */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-10">
            {user?.about || "No bio available"}
          </p>

          {/* ACTIONS (ONLY IN FEED) */}
          {isFeed && (
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => handleStatus("ignored", user?._id)}
                className="w-1/2 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Ignore
              </button>

              <button
                onClick={() => handleStatus("interested", user?._id)}
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
