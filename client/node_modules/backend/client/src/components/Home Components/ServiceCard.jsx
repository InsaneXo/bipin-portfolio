import React from "react";

const ServiceCard = ({ icon, heading, para }) => {
  return (
    <div className="bg-[#F5F5F5] flex flex-col justify-center pt-8 h-96 px-4 rounded-xl border-[#a5a5a4] border-2 gap-6 max-lg:items-center">
      <div className="flex ">
        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-semibold text-slate-900 max-lg:text-center max-sm:text-xl">
          {heading}
        </h1>
        <p className="text-xl text-[#7F7F7E] max-lg:text-center max-sm:text-base">{para}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
