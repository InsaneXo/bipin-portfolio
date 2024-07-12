import React, { useState } from "react";

import { FaUserGraduate } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const EducationAndWork = ({ blur, loading }) => {
  const educationList = [
    {
      date: "2021-2024",
      education: "The Glocal University",
      course: "BCA(Bachelor of Computer Applications)",
    },
    {
      date: "2019-2020",
      education: "12th CBSE BOARD",
      course: "Commerce",
    },
    {
      date: "2017-2018",
      education: "10th CBSE BOARD",
      course: "All Subjects",
    },
  ];
  const workList = [
    {
      date: "3 Months of Internship",
      organiztion: "TechInterio Pvt Ltd",
      post: "MERN Developer",
    },
  ];
  return (
    <div
      id="academic"
      className={`${loading ? "hidden":undefined}  py-60 w-screen  flex flex-col justify-center gap-9 max-lg:h-fit max-lg:py-3 ${
        blur && "max-xl:blur"
      }`}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex gap-1 items-center">
          <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
          <h1 className="text-3xl font-medium text-slate-900 max-sm:text-xl">
            Education & Work
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[#FAAD1B] font-medium text-5xl max-lg:text-4xl max-sm:text-2xl">
            <span className=" text-slate-900 font-semibold">My</span> Academic
            and
          </h1>
          <h1 className="text-slate-900  font-semibold text-5xl max-lg:text-4xl max-sm:text-2xl">
            <span className="text-[#FAAD1B] font-medium">Professional</span>{" "}
            Academic Journey
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 px-8 max-lg:flex-col max-sm:px-3">
        <div className=" h-[600px] w-[500px]  bg-[#F5F5F5] rounded-xl p-3 max-lg:w-full ">
          {" "}
          <div>
            <div className="flex gap-2 items-center mb-9">
              <div className=" p-5 bg-[#FAAD1B] rounded-full max-sm:p-3">
                <FaUserGraduate size={35} color="white" />
              </div>
              <h1 className="text-3xl font-medium text-slate-900 max-sm:text-lg">
                Education
              </h1>
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            {educationList.map((item, index) => (
              <div key={index} className="w-full py-1 flex gap-3">
                <div className="w-2 bg-slate-500 py-1 rounded-full"></div>
                <div>
                  <h1 className=" text-lg text-slate-900">{item.date}</h1>
                  <h1 className=" font-semibold text-2xl text-slate-900 max-sm:text-lg">
                    {item.education}
                  </h1>
                  <h1 className=" text-2xl font-normal text-slate-900 max-sm:text-base">
                    {item.course}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[600px] w-[500px] bg-[#F5F5F5] rounded-xl p-3 max-lg:w-full">
          <div className="flex gap-2 items-center mb-9">
            <div className=" p-5 bg-[#FAAD1B] rounded-full max-sm:p-3">
              <MdWork size={35} color="white" />
            </div>
            <h1 className="text-3xl font-medium text-slate-900 max-sm:text-lg">
              Work Experience
            </h1>
          </div>
          {workList.map((item, index) => (
            <div key={index} className="flex flex-col w-full gap-3">
              <div className="w-full py-1 flex gap-3">
                <div className="w-2 bg-slate-500 py-1 rounded-full"></div>
                <div>
                  <h1 className=" text-lg text-slate-900">{item.date}</h1>
                  <h1 className=" font-semibold text-2xl text-slate-900 max-sm:text-lg">
                    {item.organiztion}
                  </h1>
                  <h1 className=" text-2xl font-normal text-slate-900 max-sm:text-base">
                    {item.post}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationAndWork;
