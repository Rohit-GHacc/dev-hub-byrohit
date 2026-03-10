import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const getConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    // console.log(response)
    setConnections(response.data.data);
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections || connections.length === 0)
    return (
      <div className="text-center m-5 font-bold text-3xl">
        {" "}
        No connections found !{" "}
      </div>
    );

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="font-bold text-3xl my-6">Connections</h1>

      {connections.map((c) => (
        <div
          key={c._id}
          className="flex items-center justify-between bg-base-300 w-full max-w-2xl my-2 p-4 rounded-2xl shadow-sm"
        >
          {/* Left */}
          <div className="w-full flex items-center justify-between gap-4">
            <div className = 'flex items-center gap-4'>
              <div className="w-16 h-16 rounded-full bg-white overflow-hidden shrink-0">
                <img
                  src={c.photoURL}
                  alt={c.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  {c.firstName} {c.lastName}
                </span>
                {c.age && c.gender && (
                  <span className="text-sm opacity-70">
                    {c.age} • {c.gender.toUpperCase()}
                  </span>
                )}
                {c.about && (
                  <span className="text-sm opacity-80 line-clamp-2">
                    {c.about}
                  </span>
                )}
              </div>
            </div>
            <Link to={'/chat/'+c._id}><button className="btn btn-primary m-2 "> <img className = 'w-8 h-8' src = '../../assets/chat.png'/></button> </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Connections;
