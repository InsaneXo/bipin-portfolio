import React from "react";

import { FaLaptopCode } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { BsColumnsGap } from "react-icons/bs";
import ServiceCard from "./ServiceCard";

const Service = ({blur , loading}) => {
  
  const serviceList = [
    {
      icon: <FaLaptopCode size={40} />,
      heading: "Web Designer",
      para: "Crafts visually engaging and user-friendly websites, combining aesthetics with functionality to create an intuitive online experience.",
    },
    {
      icon: <CiMobile3 size={40} />,
      heading: "Responsive Designs",
      para: " A website or application adapts seamlessly to different screen sizes and devices, providing an optimal user experience across desktops, tablets, and smartphones.",
    },
    {
      icon: <BsColumnsGap size={40} />,
      heading: "UI/UX Experience",
      para: "The process of creating user-friendly and visually appealing interfaces that provide an intuitive and satisfying experience for users.",
    },
  ];
  return (
    <div
      id="service"
      className={`${loading ? "hidden":undefined}  w-full px-8 flex flex-col justify-center gap-5 max-lg:h-fit max-lg:items-center py-64 max-md:py-3 ${
          blur && "max-xl:blur"
        }`}
    >
      <div className="flex gap-2 items-center ">
        <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
        <h1 className=" text-3xl font-semibold text-slate-900 max-sm:text-2xl">Services</h1>
      </div>
      <div className="">
        <h1 className="text-slate-900 font-semibold text-6xl max-lg:text-5xl max-sm:text-2xl">
          <span className="text-[#FAAD1B]">Services</span> I Provide
        </h1>
      </div>
      <div className="flex items-center justify-between gap-4 max-lg:flex-col">
        {serviceList.map((item, index) => (
          <ServiceCard
            key={index}
            icon={item.icon}
            heading={item.heading}
            para={item.para}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
