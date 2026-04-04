import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";
import toast from "react-hot-toast";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  const reviewRequest = async (status, id, name) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));

      if (status === "accepted") {
        toast.success(`You are now connected with ${name} 🎉`);
      } else {
        toast(`You ignored ${name}`, { icon: "👋" });
      }

    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  // Empty state
  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-linear-to-br from-blue-50 to-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700">
          No pending requests
        </h2>
        <p className="text-gray-500 mt-2">
          You're all caught up 🎯
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-br from-blue-50 to-gray-100 px-4 py-8">
      
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Connection Requests
        </h1>

        {/* List */}
        <div className="flex flex-col gap-4">
          {requests.map((request) => {
             if (!request.fromUserId) return null; 
            const { _id, firstName, lastName, about, age, gender, photoURL } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                
                {/* Left */}
                <div className="flex items-center gap-4 flex-1">

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden border">
                    <img
                      src={photoURL}
                      alt={firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {firstName} {lastName}
                    </span>

                    {age && gender && (
                      <span className="text-sm text-gray-500">
                        {age} • {gender}
                      </span>
                    )}

                    {about && (
                      <span className="text-sm text-gray-600 line-clamp-1">
                        {about}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() =>
                      reviewRequest("accepted", request._id, firstName)
                    }
                    className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      reviewRequest("rejected", request._id, firstName)
                    }
                    className="flex-1 sm:flex-none border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
                  >
                    Reject
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Requests;