import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { addUser } from "../store/userSlice";
import toast from "react-hot-toast";
import MotionBg from "./MotionBg";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    about: "",
    skills: "",
    photoURL: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      age: user.age || "",
      about: user.about || "",
      skills: user.skills || "",
      photoURL: user.photoURL || "",
    });
  }, [user]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(BASE_URL + "/profile/edit", form, {
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
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(BASE_URL + "/profile/upload", formData, {
        withCredentials: true,
      });

      handleChange("photoURL", res.data.photoURL);
      toast.success("Image uploaded 📸");
    } catch {
      toast.error("Upload failed");
    }
  };

  if (!user) return <div className="text-center mt-10 bg-linear-to-br from-blue-50 to-gray-100">Loading...</div>;

  return (
    <div className="min-h-[90vh] bg-linear-to-br from-blue-50 to-gray-100 px-4 py-10">
      <MotionBg/>
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
                Choose Image
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <span className="text-sm text-gray-500 truncate max-w-37.5">
                {file ? file.name : "No file selected"}
              </span>

              <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Upload
              </button>
            </div>

            {/* Preview */}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-3 w-20 h-20 rounded-full object-cover border"
              />
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
