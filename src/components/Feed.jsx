import UserCard from "./UserCard";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../store/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // 🔹 Empty state
  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          No new users found
        </h2>
        <p className="text-gray-500 mt-2">
          Try again later or explore connections
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      
      {/* Card Container */}
      <div className="relative flex items-center justify-center w-full">
        
        {/* Main Card */}
        <UserCard user={feed[0]} isFeed={true} />

      </div>
    </div>
  );
};

export default Feed;