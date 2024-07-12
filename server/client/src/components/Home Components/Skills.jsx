import React from "react";

import Marquee from "react-fast-marquee";
import SkillsCard from "./SkillsCard";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { SiTailwindcss } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaFigma } from "react-icons/fa";

const Skills = ({ blur, loading }) => {
  const skillCardObj = [
    {
      logo: <FaHtml5 size={50} color="red" />,
      name: "HTML",
      link: "https://html.com/",
    },
    {
      logo: <FaCss3Alt size={50} color="skyblue" />,
      name: "CSS",
      link: "https://css3.com/",
    },
    {
      logo: <IoLogoJavascript size={50} color="orange" />,
      name: "JavaScript",
      link: "https://www.javascript.com/",
    },
    {
      logo: <BiLogoTypescript size={50} color="skyblue" />,
      name: "TypeScript",
      link: "https://www.typescriptlang.org/",
    },
    {
      logo: <FaReact size={50} color="blue" />,
      name: "React JS",
      link: "https://react.dev/",
    },
    {
      logo: <SiTailwindcss size={50} color="skyblue" />,
      name: "Tailwind CSS",
      link: "https://tailwindcss.com/",
    },
    {
      logo: <FaNodeJs size={50} color="green" />,
      name: "Node JS",
      link: "https://nodejs.org/en",
    },
    {
      logo: <SiExpress size={50} />,
      name: "Express JS",
      link: "https://expressjs.com/",
    },
    {
      logo: <SiMongodb size={50} color="green" />,
      name: "MongoDB",
      link: "https://www.mongodb.com/",
    },
    {
      logo: <FaFigma size={50} color="blue" />,
      name: "Figma",
      link: "https://www.figma.com/",
    },
  ];

  return (
    <div
      id="skills"
      className={`${
        loading ? "hidden" : undefined
      } py-64 w-screen px-8 flex flex-col justify-center gap-24 max-lg:h-full max-lg:py-3 max-sm:gap-5 ${
        blur && "max-xl:blur"
      }`}
    >
      <div className=" text-center flex flex-col gap-3">
        <div className="flex items-center justify-center ">
          <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
          <h1 className="text-4xl font-medium text-slate-900 max-sm:text-2xl">
            My Skills
          </h1>
        </div>
        <h1 className="text-[#FAAD1B] font-medium text-4xl max-sm:text-2xl">
          Exploring the Skills
        </h1>
        <h1 className=" text-slate-900 font-semibold text-5xl max-lg:text-4xl max-sm:text-xl">
          Behind My Development and Design
        </h1>
      </div>
      <Marquee
        autoFill
        speed={100}
        gradient
        gradientColor="white"
        gradientWidth={80}
      >
        <div className="flex gap-2">
          {skillCardObj.map((item, index) => (
            <SkillsCard
              key={index}
              logo={item.logo}
              link={item.link}
              name={item.name}
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Skills;
