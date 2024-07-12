import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectCard = ({
  projectTitle,
  projectLink,
  projectImage,
  techStack,
}) => {
  return (
    <>
      <div className="bg-[#F5F5F5] rounded-xl overflow-hidden p-3 ml-2 mb-1 flex flex-col flex-1">
        <div className=" w-full bg-slate-900 rounded-xl overflow-hidden my-2">
          <img
            className=" h-full w-full object-cover"
            src={projectImage}
            alt="Project Images"
          />
        </div>
        <div className="my-4 max-sm:hidden">
          <div className="flex gap-1 flex-wrap max-sm:hidden">
            {techStack.map((item, index) => (
              <span
                key={index}
                className=" px-4 py-1 text-white bg-[#FAAD1B] w-fit rounded-full  font-medium text-sm mb-1"
              >
                {item}
              </span>
            ))}
          </div>
          <h1 className=" text-slate-900 font-semibold text-xl break-words self-start my-3">
            {projectTitle}
          </h1>

          <a
            href={projectLink}
            target="blank"
            className="bg-[#43424A] p-3 rounded-full cursor-pointer w-full flex items-center justify-center gap-2"
          >
            <span className="text-white font-semibold">Open</span>
            <FaArrowRightLong size={20} color="#FAAD1B" />
          </a>
        </div>
      </div>
      <div className="hidden max-sm:block px-2 ">
        <div className=" gap-1 flex items-center  flex-wrap ">
          {techStack.map((item, index) => (
            <span
              key={index}
              className=" px-4 py-1 text-white bg-[#FAAD1B] w-fit rounded-full  font-medium text-sm  mb-1"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex justify-between flex-col items-start gap-3 flex-wrap">
          <h1 className=" text-slate-900 font-semibold break-normal text-base">
            {projectTitle}
          </h1>
          <a
            href={projectLink}
            className="bg-[#43424A]  p-3 rounded-full cursor-pointer w-full flex gap-2 items-center justify-center"
          >
            <span className="text-white font-semibold">Open</span>
            <FaArrowRightLong size={20} color="#FAAD1B" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
