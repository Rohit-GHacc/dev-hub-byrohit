import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa";
// import logo from '../../public/logo.jpg'
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="navbar bg-base-300 shadow-md px-4">
      {/* Logo */}
      <div className="flex-1">
        {user ? <Link to="/" className="text-3xl font-bold tracking-wide flex items-center cursor-pointer gap-4">
           <img className = 'w-10 rounded-tr-2xl rounded-br-2xl rounded-l' src = '/logo.jpg'/>  <span > DevHub</span> 
        </Link> : 
        <div  className="text-3xl font-bold tracking-wide flex items-center cursor-pointer gap-4">
           <img className = 'w-10 rounded-r-2xl rounded-l' src = '/logo.jpg'/>  <span>DevHub</span>
        </div> 
        }
      </div>

      {user && (
        <div className="flex items-center gap-6">
          {/* Greeting */}
          {user.isPremium && (
            <div className="tooltip tooltip-bottom" data-tip="Premium User">
              <FaCheckDouble className="cursor-pointer hover:text-white text-lg" />
            </div>
          )}
          <span className="hidden sm:block text-xl opacity-80">
            Hi, {user.firstName}
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-base-200 ring-offset-base-300 ring-offset-2 border ">
                <img src={user.photoURL} alt={user.firstName} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-xl shadow-lg mt-3 w-48 p-2"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error text-left">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;
