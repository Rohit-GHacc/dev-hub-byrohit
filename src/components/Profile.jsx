import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import api from "../utils/api";
import UserCard from "./UserCard";
import { addUser } from "../store/userSlice";
import toast from "react-hot-toast";
import MotionBg from "./MotionBg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    about: "",
    skills: "",
    images: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
  if (location.state?.croppedImage) {
    const file = location.state.croppedImage;
    const index = location.state.index;
    const filesFromState = location.state.files;

    if (!filesFromState || filesFromState.length === 0) return;

    const updated = [...filesFromState];

    if (index >= 0 && index < updated.length) {
      updated[index] = file;
    }

    setFiles(updated);
  }
}, [location.state]);
  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      age: user.age || "",
      about: user.about || "",
      skills: user.skills || "",
      images: user.images || "",
    });
  }, [user]);
  useEffect(() => {
    if (files.length > 6) {
      toast.error("You cannot select more than 6 images");
      setFiles([]);
    }
  }, [files]);
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await api.patch(BASE_URL + "/profile/edit", form, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (Array.isArray(files) && files.length === 0) return;

    const formData = new FormData();
    // formData.append("image", fileToUpload);
    files.map((file) => {
      formData.append("images", file);
    });
    // formData.append('images',files)

    try {
      const res = await api.post(BASE_URL + "/profile/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setFiles(res.data.images)
      handleChange("images", res.data.images);
      toast.success("Image uploaded 📸");
    } catch {
      toast.error("Upload failed");
    }
  };

  if (!user)
    return (
      <div className="text-center mt-10 bg-linear-to-br from-blue-50 to-gray-100">
        Loading...
      </div>
    );
  console.log("files: ", files, "isArray: ", Array.isArray(files));
  return (
    <div className="min-h-[90vh] bg-linear-to-br from-blue-50 to-gray-100 px-4 py-10">
      <MotionBg />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 z-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Edit Profile
          </h2>

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" "
              />
              <label
                className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-sm 
            peer-placeholder-shown:text-gray-400 
            peer-focus:top-2 
            peer-focus:text-xs 
            peer-focus:text-blue-500"
              >
                First Name
              </label>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" "
              />
              <label
                className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-sm 
            peer-placeholder-shown:text-gray-400 
            peer-focus:top-2 
            peer-focus:text-xs 
            peer-focus:text-blue-500"
              >
                Last Name
              </label>
            </div>
          </div>

          {/* Age */}
          <div className="relative mt-4">
            <input
              type="number"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm 
          peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 
          peer-focus:text-xs 
          peer-focus:text-blue-500"
            >
              Age
            </label>
          </div>

          {/* Gender */}
          <div className="mt-4">
            <label className="text-sm text-gray-600 mb-1 block">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* About */}
          <div className="relative mt-4">
            <textarea
              value={form.about}
              onChange={(e) => handleChange("about", e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 min-h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm 
          peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 
          peer-focus:text-xs 
          peer-focus:text-blue-500"
            >
              About
            </label>
          </div>

          {/* Skills */}
          <div className="relative mt-4">
            <textarea
              value={form.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 min-h-15 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm 
          peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 
          peer-focus:text-xs 
          peer-focus:text-blue-500"
            >
              Skills (comma separated)
            </label>
          </div>

          {/* Upload */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Profile Image
            </label>

            <div className="flex items-center gap-4 flex-wrap">
              <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition text-sm">
                Add Image
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
              </label>

              <span className="text-sm text-gray-500 truncate max-w-37.5">
                {files[0] ? files[0].name : "No file selected"}
              </span>
              <button
                onClick={() => {
                  if (!files.length) return;
                  navigate("/app/crop", {
                    state: { file: files[0], index: 0, files: files },
                  });
                }}
                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition text-sm rounded-lg cursor-pointer"
              >
                Edit Image
              </button>
              <button
                onClick={handleUpload}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Upload
              </button>
            </div>

            {/* Preview */}
            {
            Array.isArray(files) && files.length > 0 && (
              <div className="flex gap-2">
                {files.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="mt-3 w-20 h-20 rounded-full object-cover border"
                    onClick={() =>
                      navigate("/app/crop", {
                        state: { file: files[i], index: i, files: files },
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={updateProfile}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Save Changes
          </button>
        </div>

        {/* PREVIEW */}
        <div className="flex justify-center items-start z-100">
          <UserCard user={form} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
