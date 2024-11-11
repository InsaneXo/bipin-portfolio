import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ResumeDownload from "../../assets/bipin_singh_resume.pdf"

const About = ({ blur, loading }) => {
  return (
    <div
      id="about"
      className={`${
        loading ? "hidden" : undefined
      } py-64 w-screen bg-[#43424A] flex max-lg:h-fit max-lg:py-3 max-lg:flex-col max-lg:items-center max-lg:gap-4 ${
        blur && "max-xl:blur"
      } `}
    >
      <div className="left w-1/2 h-full flex items-center justify-center max-lg:w-full">
        <div className=" h-[450px] w-[450px] max-lg:h-[350px] max-lg:w-[350px] max-sm:h-[260px] max-sm:w-[260px]  rounded-full overflow-hidden">
          <img
            className=" w-full h-full object-center object-cover"
            src="/Images/myImage2.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="right w-1/2 h-full flex flex-col justify-center gap-8 max-lg:w-fit max-lg:items-center ">
        <div className="flex gap-2 items-center ">
          <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
          <h1 className=" text-3xl font-medium text-white max-sm:text-2xl">
            About Me
          </h1>
        </div>
        <div>
          <h1 className="text-[#FAAD1B] font-medium text-6xl max-lg:text-5xl max-sm:text-2xl">
            <span className="text-white font-semibold">Who is</span> Bipin
            Singh?
          </h1>
        </div>
        <div className="max-lg:text-center">
          <p className=" font-medium text-xl w-[79%] text-white max-lg:w-fit max-lg:text-lg max-sm:text-sm">
            As a proficient full stack developer specializing in dynamic web
            applications with expertise in JavaScript, React, React Native and
            Node.js.
          </p>
        </div>
        <div className="flex items-center gap-6 max-sm:flex-col-reverse">
          <div className="flex bg-[#FAAD1B] gap-1  p-1 rounded-full cursor-pointer ">
            <a href={ResumeDownload} download className="flex-1">
              <div className="bg-[#344C36] h-full flex items-center justify-center px-3 rounded-full">
                <h1 className="text-white  font-semibold text-xl max-sm:text-sm">
                  Download CV
                </h1>
              </div>
            </a>
            <div className="bg-white p-5 rounded-full ">
              <FaArrowRightLong size={20} />
            </div>
          </div>

          <div>
            <h1 className=" font-signature font-medium text-3xl text-[#FAAD1B] max-sm:text-xl">
              Bipin Singh
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
