import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
const Home = ({ blur, loading }) => {
  return (
    <>
      <div
        id="home"
        className={`${
          loading ? "hidden" : undefined
        } w-full py-64  flex justify-between  px-8 max-lg:flex-col max-lg:items-center max-lg:h-fit max-lg:py-3 max-lg:mt-24 ${
          blur && "max-xl:blur"
        }`}
      >
        <div className=" flex flex-col justify-center max-lg:items-center gap-4">
          <div className="bg-[#FAAD1B] w-fit p-3 rounded-xl  max-sm:p-2">
            <h1 className="font-semibold text-3xl text-white max-sm:text-base">
              Hello There!
            </h1>
          </div>
          <div className=" max-lg:text-center">
            <h1 className="text-slate-900 font-semibold text-6xl max-lg:text-5xl max-md:2xl max-sm:text-3xl mb-1">
              I'm <span className="text-[#FAAD1B]">Bipin Singh,</span>
            </h1>
            <h1 className=" text-slate-900 font-semibold text-6xl max-lg:text-4xl max-sm:text-3xl">
              Web Developer
            </h1>
          </div>
          <div className="max-lg:text-center">
            <p className=" font-medium text-2xl max-lg:text-lg max-sm:text-base   text-[#9F9F9F]">
              With Skills in web development and design, <br /> I offer the best
              projects resulting in quality work
            </p>
          </div>
          <div className="flex gap-2 max-lg:flex-col max-lg:mb-3">
            <div className="flex bg-[#FAAD1B] gap-1  p-1 rounded-full cursor-pointer ">
              <a href="#project" className="flex-1">
                <div className="bg-[#344C36] h-full flex items-center justify-center px-3 rounded-full">
                  <h1 className="text-white  font-semibold text-xl max-sm:text-base">
                    View My Portfolio
                  </h1>
                </div>
              </a>
              <div className="bg-white p-5 rounded-full ">
                <FaPlay />
              </div>
            </div>
            <div className="bg-white border-black flex items-center justify-center rounded-full border-2 px-10 py-4  cursor-pointer">
              <h1 className="font-semibold text-xl max-sm:text-base">
                Hire Me
              </h1>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col gap-2 items-end justify-center relative">
          <div className="flex flex-col items-center gap-2">
            <div className=" h-[450px] w-[450px] max-lg:h-[350px] max-lg:w-[350px] max-sm:h-[260px] max-sm:w-[260px]  rounded-full overflow-hidden">
              <img
                className=" w-full object-center object-contain"
                src="/Images/myImage.jpg"
                alt=""
              />
            </div>
            <div>
              <div className="flex gap-2">
                <div className="w-[50px] h-[50px] bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FE853A]">
                  <FaGithubAlt color="white" size={25} />
                </div>
                <div className="w-[50px] h-[50px] bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FE853A]">
                  <FaLinkedinIn color="white" size={25} />
                </div>
                <div className="w-[50px] h-[50px] bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FE853A]">
                  <IoLogoInstagram color="white" size={25} />
                </div>
                <div className="w-[50px] h-[50px] bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FE853A]">
                  <FaXTwitter color="white" size={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${loading ? "hidden" : undefined} relative ${
          blur && "max-xl:blur"
        }`}
      >
        <div className="absolute inset-0 bg-green-800 h-28 -skew-y-2 max-lg:h-20"></div>
        <div className="relative flex items-center justify-center h-28 bg-yellow-500 w-full max-lg:h-20">
          <div className="flex items-center space-x-8 text-lg text-green-800 font-bold w-full cursor-pointer">
            <Marquee speed={100} pauseOnHover autoFill>
              <div className="flex gap-8 items-center">
                <FaStarOfLife
                  size={40}
                  color="#0f172a"
                  className=" max-lg:text-4xl"
                />
                <div className="flex items-center ">
                  <h1 className="text-white font-semibold text-5xl max-lg:text-3xl">
                    Front-end Developer
                  </h1>
                </div>
                <FaStarOfLife
                  size={40}
                  color="#0f172a"
                  className=" max-lg:text-4xl"
                />
                <div className="flex items-center">
                  <h1 className="text-white font-semibold text-5xl max-lg:text-3xl">
                    Backend-end Developer
                  </h1>
                </div>
                <FaStarOfLife
                  size={40}
                  color="#0f172a"
                  className=" max-lg:text-4xl"
                />
                <div className="flex items-center ">
                  <h1 className="text-white font-semibold text-5xl max-lg:text-3xl">
                    Responsive Designs
                  </h1>
                </div>
                <FaStarOfLife
                  size={40}
                  color="#0f172a"
                  className=" max-lg:text-4xl"
                />
                <div className="flex items-center pr-6">
                  <h1 className="text-white font-semibold text-5xl max-lg:text-3xl">
                    UI/UX Experience
                  </h1>
                </div>
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
