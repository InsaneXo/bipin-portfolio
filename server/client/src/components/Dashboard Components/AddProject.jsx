import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { MdOutlineHideImage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { projectAction, userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";

import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddProject = () => {
  const { loading } = useSelector((store) => store.project);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [techStack, setTechStack] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProjectImage(Reader.result);
      }
    };
  };
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        projectTitle: projectTitle,
        projectImage: projectImage,
        projectLink: projectLink,
        techStack: techStack.split(","),
      };

      dispatch(projectAction.addProjectRequest());
      const { data } = await apiServices.addProject(payload);
      dispatch(projectAction.addProjectSuccess(data.message));
      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
      setProjectImage(null);
      setProjectLink("");
      setProjectTitle("");
      setTechStack("");
      navigate("/");
    } catch (error) {
      dispatch(projectAction.addProjectFailure(error.response.data.message));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-1 overflow-auto max-md:mb-20">
      <div className="border-r flex-1  p-2 max-md:p-1 flex items-center justify-center max-md:items-start">
        <div className=" w-4/5 max-md:w-full border rounded-md p-4 overflow-hidden max-md:border-none max-md:p-1">
          <form onSubmit={handleAddProject} className="relative">
            <Typography variant="h5" marginBottom={1}>
              Add Project
            </Typography>
            <div className=" w-full border rounded-md h-[47vh] flex items-center justify-center p-2 mb-2 ">
              {projectImage ? (
                <div className="flex h-full w-full">
                  <img
                    className="object-contain h-full w-full"
                    src={projectImage}
                    alt="post"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <MdOutlineHideImage size={25} />
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center"
                >
                  <img width={50} src="/Images/image.png" alt="" />
                  <h1>Click to select an images</h1>
                </label>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className=" border h-12 rounded-md px-2 outline-none"
                type="text"
                placeholder="Enter Project Title"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <input
                className=" border h-12 rounded-md px-2 outline-none"
                type="url"
                placeholder="Enter Project Link"
                required
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
              <textarea
                className=" border h-24 rounded-md px-2 outline-none"
                type="text"
                placeholder="Enter Technology Stack separated by comma. Ex. Node Js, Express Js ... etc"
                required
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                spellCheck={false}
              />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                required
              />
              <button
                type="submit"
                className="flex-1"
                disabled={
                  !projectTitle && !projectLink && !projectImage && !techStack
                }
              >
                <div
                  className={`${
                    projectTitle || projectLink || projectImage || techStack
                      ? "bg-[#344C36]"
                      : "bg-[#5b805e] cursor-not-allowed"
                  }  py-3 cursor-pointer`}
                >
                  <h1 className="text-white text-center">Add Project</h1>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
