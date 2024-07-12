import React from "react";

const SkillsCard = ({ logo, name, link }) => {
  return (
    <div className=" w-fit flex flex-col items-center justify-center gap-3 cursor-pointer">
      <div className="box bg-[#F5F5F5] rounded-full p-9 ">
        <div className="flex flex-col items-center gap-1">
          <a href={link} target="blank">
            <div className=" h-24 w-24 rounded-full bg-white flex justify-center items-center">
              {logo}
            </div>
          </a>
        </div>
      </div>
      <div className="text-slate-900 text-xl font-medium">{name}</div>
    </div>
  );
};

export default SkillsCard;
