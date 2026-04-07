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
  const MAX_SKILLS = 10;
  const MAX_PROJECTS = 6;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    about: "",
    skills: "",
    images: "",
    projects: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [projectInput, setProjectInput] = useState("");

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
    const initialSkills = Array.isArray(user.skills)
      ? user.skills
      : typeof user.skills === "string"
        ? user.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const initialProjects = Array.isArray(user.projects)
      ? user.projects
      : typeof user.projects === "string"
        ? user.projects
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    setSkillsList(initialSkills.slice(0, MAX_SKILLS));
    setProjectsList(initialProjects.slice(0, MAX_PROJECTS));
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      age: user.age || "",
      about: user.about || "",
      skills: initialSkills.slice(0, MAX_SKILLS),
      images: user.images || "",
      projects: initialProjects.slice(0, MAX_PROJECTS),
    });
  }, [user]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, skills: skillsList }));
  }, [skillsList]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, projects: projectsList }));
  }, [projectsList]);
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
      formData.append("skills", JSON.stringify(skillsList));
      formData.append("projects", JSON.stringify(projectsList));

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

  const handleAddSkill = () => {
    const raw = skillInput.trim();
    if (!raw) return;

    const candidates = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (candidates.length === 0) return;

    setSkillsList((prev) => {
      if (prev.length >= MAX_SKILLS) return prev;

      const nextList = [...prev];

      for (const candidate of candidates) {
        if (nextList.length >= MAX_SKILLS) break;
        const exists = nextList.some(
          (s) => s.toLowerCase() === candidate.toLowerCase(),
        );
        if (exists) continue;
        nextList.push(candidate);
      }

      return nextList;
    });

    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setSkillsList((prev) => prev.filter((s) => s !== skill));
  };

  const handleAddProject = () => {
    const raw = projectInput.trim();
    if (!raw) return;

    const candidates = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (candidates.length === 0) return;

    setProjectsList((prev) => {
      if (prev.length >= MAX_PROJECTS) return prev;

      const nextList = [...prev];

      for (const candidate of candidates) {
        if (nextList.length >= MAX_PROJECTS) break;
        let normalized = candidate;
        if (!/^https?:\/\//i.test(normalized)) {
          normalized = `https://${normalized}`;
        }

        try {
          new URL(normalized);
        } catch {
          continue;
        }

        const exists = nextList.some(
          (u) => u.toLowerCase() === normalized.toLowerCase(),
        );
        if (exists) continue;
        nextList.push(normalized);
      }

      return nextList;
    });

    setProjectInput("");
  };

  const handleRemoveProject = (url) => {
    setProjectsList((prev) => prev.filter((p) => p !== url));
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
          <div className="mt-4">
            <label className="text-sm text-gray-600 mb-2 block">Skills</label>

            {skillsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-sm"
                  >
                    <span className="max-w-55 truncate">{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={
                  skillsList.length >= MAX_SKILLS
                    ? `Maximum ${MAX_SKILLS} skills added`
                    : "Add a skill"
                }
                disabled={skillsList.length >= MAX_SKILLS}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                disabled={skillsList.length >= MAX_SKILLS}
                className="px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                title="Add skill"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {skillsList.length}/{MAX_SKILLS} skills
            </p>
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-600 mb-2 block">Projects</label>

            {projectsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {projectsList.map((url) => (
                  <span
                    key={url}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-sm"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="max-w-60 truncate hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {url}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(url)}
                      className="h-5 w-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition"
                      aria-label={`Remove ${url}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={projectInput}
                onChange={(e) => setProjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddProject();
                  }
                }}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={
                  projectsList.length >= MAX_PROJECTS
                    ? `Maximum ${MAX_PROJECTS} projects added`
                    : "Add deployed project link"
                }
                disabled={projectsList.length >= MAX_PROJECTS}
              />
              <button
                type="button"
                onClick={handleAddProject}
                disabled={projectsList.length >= MAX_PROJECTS}
                className="px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                title="Add project"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {projectsList.length}/{MAX_PROJECTS} projects
            </p>
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
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
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
