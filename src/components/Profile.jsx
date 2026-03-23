import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { addUser } from "../store/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  // console.log('in profile' , user)
  const [file, setFile] = useState(null);

  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setGender(user.gender || "");
    setAge(user.age || "");
    setPhotoURL(user.photoURL || "");
    setAbout(user?.about || "");
    setSkills(user.skills || "");
  }, [user]);

  const updateProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, about, skills, photoURL },
        { withCredentials: true },
      );
      setToast(true);
      console.log(response.data);
      setTimeout(() => setToast(false), 3000);
      dispatch(addUser(response.data));
      // console.log("in profile", response);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    // formData.append("firstName", firstName);
    // formData.append("lastName", lastName);
    // formData.append("gender", gender);
    // formData.append("age", age);
    // formData.append("about", about);
    // formData.append("skills", skills);
    formData.append("image", file);

    const res = await axios.post(BASE_URL + "/profile/upload", formData, {
      withCredentials: true,
    });
    setPhotoURL(res.data.photoURL)
    console.log(res.data);
  };
  if (!user) return <div>LOADING...</div>;
  return (
    <>
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}

      <div className="flex justify-center px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
          {/* Form Card */}
          <div className="card bg-base-300 shadow-xl w-full lg:w-1/2">
            <div className="card-body">
              <h2 className="card-title text-3xl justify-center mb-6">
                Update Profile
              </h2>

              {[
                ["First Name", firstName, setFirstName, "text"],
                ["Last Name", lastName, setLastName, "text"],
                ["Age", age, setAge, "number"],
              ].map(([label, value, setter, type]) => (
                <div key={label} className="flex flex-col gap-1">
                  <label className="font-medium">{label}</label>
                  <input
                    type={type}
                    className="input input-bordered w-full"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label className="font-medium">Gender</label>
                <select
                  className="select select-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {[
                ["About", about, setAbout],
                ["Skills", skills, setSkills],
              ].map(([label, value, setter]) => (
                <div key={label} className="flex flex-col gap-1">
                  <label className="font-medium">{label}</label>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-20"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-3 items-center m-2 ">
                <label for="file" className="font-medium">
                  {" "}
                  Upload Image{" "}
                </label>
                <input
                  className="file-input"
                  name="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="btn btn-secondary" onClick={handleUpload}>
                  {" "}
                  Upload{" "}
                </button>
              </div>
              {error && <p className="text-error text-sm">{error}</p>}

              <button
                className="btn btn-sm btn-secondary"
                onClick={updateProfile}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex justify-center lg:items-start w-full lg:w-1/2">
            <UserCard
              user={{
                firstName,
                lastName,
                gender,
                age,
                photoURL,
                about,
                skills,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
