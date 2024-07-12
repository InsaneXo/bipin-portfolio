import React, { useEffect } from "react";

import ProjectCard from "./ProjectCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Projects = ({ blur, loading }) => {
  const { project } = useSelector((store) => store.project);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      id="project"
      className={`${loading ? "hidden":undefined} py-32 w-screen px-8 flex flex-col justify-center max-lg:h-full max-lg:py-4 ${
        blur && "max-xl:blur"
      }`}
    >
      <div>
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="flex gap-1 items-center">
            <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
            <h1 className="text-3xl font-medium text-slate-900 max-sm:text-2xl">
              My Portfolio
            </h1>
          </div>
          <div>
            <h1 className="text-[#FAAD1B] font-medium text-6xl max-lg:text-5xl max-sm:text-2xl max-sm:mb-4">
              <span className="text-slate-900 font-semibold">My Latest</span>{" "}
              Project
            </h1>
          </div>
        </div>
        {project && (
          <div className="w-full flex flex-col p-8 max-sm:p-0">
            <Slider {...settings}>
              {project.map((item) => (
                <ProjectCard
                  key={item._id}
                  projectTitle={item.projectTitle}
                  projectLink={item.projectLink}
                  projectImage={item.projectImage.url}
                  techStack={item.techStack}
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
