import api from "../utils/api";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaLink,
  FaBriefcase,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SiVercel, SiNetlify } from "react-icons/si";

const DEFAULT_AVATAR =
  "https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg";

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeProjects = (projects) => {
  if (!projects) return [];
  if (Array.isArray(projects)) {
    return projects.filter((u) => typeof u === "string" && u.length > 0);
  }
  if (typeof projects === "string") {
    return projects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const getProjectMeta = (url) => {
  const lower = String(url || "").toLowerCase();
  if (lower.includes("github.com")) return { icon: FaGithub, label: "GitHub" };
  if (lower.includes("vercel.app") || lower.includes("vercel.com"))
    return { icon: SiVercel, label: "Vercel" };
  if (lower.includes("netlify.app") || lower.includes("netlify.com"))
    return { icon: SiNetlify, label: "Netlify" };
  return { icon: FaGlobe, label: "Project" };
};

const normalizeProjectLinks = (projectLinks) => {
  if (!projectLinks) return [];

  if (Array.isArray(projectLinks)) {
    return projectLinks
      .filter((l) => l && typeof l === "object")
      .map((l) => ({
        label: l.label || l.type || "Link",
        url: l.url,
        type: l.type,
      }))
      .filter((l) => typeof l.url === "string" && l.url.length > 0);
  }

  if (typeof projectLinks === "object") {
    return Object.entries(projectLinks)
      .filter(([, url]) => typeof url === "string" && url.length > 0)
      .map(([type, url]) => ({ label: type, url, type }));
  }

  return [];
};

const getLinkMeta = (typeOrLabel) => {
  const key = String(typeOrLabel || "").toLowerCase();

  if (key.includes("github")) return { icon: FaGithub, label: "GitHub" };
  if (key.includes("linkedin")) return { icon: FaLinkedin, label: "LinkedIn" };
  if (key.includes("portfolio")) return { icon: FaBriefcase, label: "Portfolio" };
  if (key.includes("website")) return { icon: FaGlobe, label: "Website" };
  return { icon: FaLink, label: "Link" };
};

const UserCard = ({ user, isFeed = false }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.isArray(user?.images) ? user.images : [];
  const skills = toArray(user?.skills);
  const projectLinks = normalizeProjectLinks(user?.projectLinks);
  const projects = normalizeProjects(user?.projects);

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
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="flex justify-center w-full px-4 py-6 sm:py-8">
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
        className="w-full max-w-105 bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col"
      >
        {/* IMAGE */}
        <div className="relative w-full aspect-4/5 overflow-hidden">
          <img
            src={images.length ? images[currentIndex] : DEFAULT_AVATAR}
            alt="user"
            className="w-full h-full object-cover transition duration-300"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          {/* header */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-white text-xl sm:text-2xl font-semibold leading-tight truncate">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-white/80 text-sm truncate">
                  {user?.age ? `${user.age}` : null}
                  {user?.age && user?.gender ? " • " : null}
                  {user?.gender || null}
                </p>
              </div>

              {projectLinks.length > 0 && (
                <div className="flex items-center gap-2">
                  {projectLinks.slice(0, 4).map((link) => {
                    const meta = getLinkMeta(link.type || link.label);
                    const Icon = meta.icon;
                    return (
                      <a
                        key={`${link.label}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        title={meta.label}
                        className="h-9 w-9 rounded-full bg-white/12 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              )}

          {projects.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-white mb-2">Projects</p>
              <div className="flex flex-wrap gap-2">
                {projects.slice(0, 6).map((url) => {
                  const meta = getProjectMeta(url);
                  const Icon = meta.icon;
                  return (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      title={meta.label}
                      className="h-11 w-11 rounded-2xl border border-gray-500 bg-gray-500 shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-400 hover:border-gray-300 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon className="text-xl text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
            </div>
          </div>

          {images.length > 1 && (
            <>
              {/* left arrow */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/35 text-white p-2.5 rounded-full hover:bg-black/55 transition"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              {/* right arrow */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/35 text-white p-2.5 rounded-full hover:bg-black/55 transition"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* About */}
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 min-h-16">
            {user?.about || "Building cool things. Open to collaborations."}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.slice(0, 8).map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Project Links */}
          {projectLinks.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Project links
              </p>
              <div className="flex flex-wrap gap-2">
                {projectLinks.slice(0, 6).map((link) => {
                  const meta = getLinkMeta(link.type || link.label);
                  const Icon = meta.icon;

                  return (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm text-gray-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon className="text-gray-700" />
                      <span className="max-w-35 truncate">
                        {meta.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIONS (ONLY IN FEED) */}
          {isFeed && (
            <div className="mt-auto pt-4 flex gap-3">
              <button
                onClick={() => handleStatus("ignored", user?._id)}
                className="w-1/2 border border-gray-200 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition font-medium cursor-pointer"
              >
                Ignore
              </button>

              <button
                onClick={() => handleStatus("interested", user?._id)}
                className="w-1/2 bg-linear-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow cursor-pointer"
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
