import React, { useState, useEffect, useRef, use } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (location.state?.croppedImage) {
      const file = location.state.croppedImage;
      const index = location.state.index;
      const filesFromState = location.state.files;

      if (!filesFromState) return;

      const updated = [...filesFromState];
      updated[index] = file;
      setFiles(updated);
      // navigate('/app/profile',{ replace: true})
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
    if (user?.images && files.length === 0 && !location.state?.croppedImage) {
      setFiles([...user.images]);
    }
  }, [user]);
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // const updateProfile = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await api.patch(BASE_URL + "/profile/edit", form, {
  //       withCredentials: true,
  //     });

  //     dispatch(addUser(res.data));
  //     toast.success("Profile updated successfully 🎉");
  //   } catch (err) {
  //     toast.error("Update failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log("FILES: ", files)
  const updateProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      const existingImageUrls = files.filter((file) => typeof file === "string");
      formData.append("existingImages", JSON.stringify(existingImageUrls));

      // append only new files
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        }
      });

      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("age", form.age);
      formData.append("gender", form.gender);
      formData.append("about", form.about);
      formData.append("skills", form.skills);

      const res = await api.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addUser(res.data));
      setFiles(res.data.images);
      toast.success("Profile updated 🎉");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = file;
      return updated;
    });

    setSelectedIndex(null);
  };
  if (!user)
    return (
      <div className="text-center mt-10 bg-linear-to-br from-blue-50 to-gray-100">
        Loading...
      </div>
    );
  // console.log("files: ", files, "isArray: ", Array.isArray(files));
  console.log("FILES:", files);
  console.log("USER IMAGES:", user?.images);
  const handleSlotClick = (index) => {
    const file = files[index];

    if (file) {
      // edit existing or new
      navigate("/app/crop", {
        state: {
          file,
          index,
          files,
        },
      });
    } else {
      // empty slot → add image
      setSelectedIndex(index);
      fileInputRef.current.click();
    }
  };


  const handleDelete = (index) => {
    setFiles((prevFiles) => {
      const updated = [...prevFiles];
      updated[index] = null;
      return updated;
    });
  };
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

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
            {/* Preview */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {Array.from({ length: 6 }).map((_, i) => {
                const file = files[i];

                {
                  /* <div className = 'ml-17 mb-13 absolute h-4 w-4 bg-red-500 hover:bg-red-700 rounded-full'> 
                  </div> */
                }
                return (
                  <div
                    key={i}
                    className="relative w-19 h-19 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center bg-gray-100 hover:scale-105 transition"
                  >
                    {/* IMAGE */}
                    <div
                      onClick={() => handleSlotClick(i)}
                      className="w-full h-full overflow-hidden rounded-full flex items-center justify-center"
                    >
                      {file ? (
                        <img
                          src={
                            file instanceof File
                              ? URL.createObjectURL(file)
                              : file
                          }
                          className="w-full h-full object-cover "
                        />
                      ) : (
                        <span className="text-gray-400 text-2xl flex justify-center items-center">+</span>
                      )}
                    </div>

                    {/* DELETE BUTTON */}
                    {file && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 🔥 prevent slot click
                          handleDelete(i);
                        }}
                        className="absolute -top-1 -right-1 z-10 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex pb-0.5 items-center justify-center hover:bg-red-500 cursor-pointer"
                      >
                        x
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
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
