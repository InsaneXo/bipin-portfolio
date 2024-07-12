import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { MdOutlineHideImage } from "react-icons/md";
import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { projectAction, userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";


const ProjectCard = ({
  projectId,
  projectTitle,
  projectImage,
  projectLink,
  techStack,
  createdAt,
}) => {
  const publishDate = new Date(createdAt);
  const humanReadableDateOnly = publishDate.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [stack, setStack] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const handleDeleteProject = async () => {
    try {
      console.log(projectId);
      dispatch(projectAction.deleteProjectRequest());
      const { data } = await apiServices.deleteProject(projectId);
      dispatch(projectAction.deleteProjectSuccess(data.message));
      setOpen(!open);
      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
    } catch (error) {
      dispatch(projectAction.deleteProjectFailure(error.response.data.message));
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        projectTitle: title,
        projectLink: link,
        projectImage: image,
        techStack: stack,
      };

      dispatch(projectAction.updateProjectRequest());
      const { data } = await apiServices.updateProject(projectId, payload);
      dispatch(projectAction.updateProjectSuccess(data.message));
      setOpen2(!open2);
      dispatch(userAction.loadUserRequest());
      const { data: loaduser } = await apiServices.loadUser();
      dispatch(userAction.loadUserSuccess(loaduser.user));
    } catch (error) {
      dispatch(projectAction.updateProjectFailure(error.response.data.message));
    }
  };

  return (
    <div className="w-full p-4 flex gap-3  px-3 max-md:flex-col">
      <div className="bg-slate-900 h-40 w-40 max-md:w-full max-md:h-[350px] rounded-lg overflow-hidden">
        <img
          src={projectImage}
          alt="Project Images"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 ">
        <h1 className="text-2xl font-semibold">{projectTitle}</h1>
        <div className="my-2 flex flex-wrap">
          {techStack.map((item, index) => (
            <span
              key={index}
              className=" px-4 py-1 text-white bg-[#FAAD1B] w-fit rounded-full  font-medium text-sm  mb-1 mr-1"
            >
              {item}
            </span>
          ))}
        </div>
        <div>
          <h1 className="text-lg text-gray-500 font-semibold">
            Published on <span>{humanReadableDateOnly}</span>
          </h1>
          <a href={projectLink} target="blank">
            <h1 className="text-lg text-gray-500">Project Link</h1>
          </a>
        </div>
      </div>
      <div className="max-md:flex max-md:gap-2">
        <div
          className="flex items-center bg-red-600 h-10 w-10 justify-center  rounded-full mb-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <RiDeleteBin5Fill color="white" size={25} />
        </div>
        <div
          className="flex items-center bg-[#344C36] h-10 w-10 justify-center  rounded-full mb-2 cursor-pointer"
          onClick={() => setOpen2(!open2)}
        >
          <RxUpdate color="white" size={25} />
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="h-[600px] p-5 flex flex-col justify-between">
          <div>
            <div className="h-[300px] w-full bg-blue-500 rounded-lg overflow-hidden mb-2">
              <img
                src={projectImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{projectTitle}</h1>
              <div className="my-2 flex flex-wrap">
                {techStack.map((item, index) => (
                  <span
                    key={index}
                    className=" px-4 py-1 text-white bg-[#FAAD1B] w-fit rounded-full  font-medium text-sm  mb-1 mr-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <h1 className="text-lg text-gray-500 font-semibold">
                  Published on: <span>{humanReadableDateOnly}</span>
                </h1>
                <a href={projectLink} target="blank">
                  <h1 className="text-lg text-gray-500">{projectLink}</h1>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg text-red-500 text-center mb-5 font-semibold">
              Are you want to Delete this Project?
            </h1>
            <div className="flex ">
              <div
                className="flex-1 border py-3 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <h1 className="text-center">Cancel</h1>
              </div>
              <div
                className="flex-1 bg-red-500 py-3 cursor-pointer"
                onClick={handleDeleteProject}
              >
                <h1 className="text-white text-center">Delete</h1>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open2}
        onClose={() => setOpen2(!open2)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="h-[600px] flex flex-col p-5">
          <div>
            <div className="flex flex-col">
              <div className="h-[300px] w-full bg-blue-500 rounded-lg overflow-hidden mb-2">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={projectImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <label htmlFor="image-upload" className="cursor-pointer self-end">
                <MdOutlineHideImage size={25} />
              </label>
            </div>
          </div>
          <div className=" flex-1">
            <form onSubmit={handleUpdateProject}>
              <div className="mb-2">
                <h1 className="font-medium text-lg">Project Title</h1>
                <input
                  type="text"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={projectTitle}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-medium text-lg">Project link</h1>
                <input
                  type="url"
                  className="w-full border h-12 rounded-lg p-2 outline-none"
                  placeholder={projectLink}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <h1 className="font-medium text-lg">Technology Stack</h1>
                <textarea
                  className="border w-full h-16 rounded-lg p-2 outline-none"
                  placeholder={techStack}
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  spellCheck={false}
                ></textarea>
              </div>
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <div className="flex mb-2">
                <div
                  className="flex-1 border py-3 cursor-pointer"
                  onClick={() => setOpen2(!open2)}
                >
                  <h1 className="text-center">Cancel</h1>
                </div>
                <button
                  type="submit"
                  className="flex-1 "
                  disabled={!title && !image && !link && !stack}
                >
                  <div
                    className={`${
                      title || image || link || stack
                        ? "bg-[#344C36] cursor-pointer"
                        : "bg-[#5b805e] cursor-not-allowed"
                    }  py-3 `}
                  >
                    <h1 className="text-white text-center">Update</h1>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectCard;
