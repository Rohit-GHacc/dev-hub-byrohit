import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const UserCard = ({ user, isFeed = false }) => {
  const dispatch = useDispatch();

  const handleStatus = async (status, userId) => {
    try {
      const loadingToast = toast.loading("Processing...");

      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
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
        className="w-[320px] sm:w-85 h-105 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col"
      >
        {/* IMAGE (ALWAYS FIXED) */}
        <div className="w-full h-55 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={user?.photoURL}
            alt={user?.firstName}
            className="w-full h-full object-cover"
          />
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