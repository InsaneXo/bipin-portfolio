import React from "react";
import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { BsBootstrap } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = ({ blur, loading }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer
        className={`${loading ? "hidden" : undefined} bg-white py-16 ${
          blur && "max-xl:blur"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex  justify-between items-start max-lg:flex-col max-lg:gap-5">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-semibold mb-4 max-sm:text-2xl">
                Let's{" "}
                <span className="text-yellow-400 font-medium">Connect</span>{" "}
                there
              </h2>
              <div className="flex items-center mb-4">
                <div className="flex gap-2 items-center justify-center cursor-pointer">
                  <div className="h-14 w-14 bg-[#FAAD1B] rounded-full flex items-center justify-center">
                    <BsBootstrap size={35} color="#344C36" />
                  </div>
                  <h1 className="text-2xl text-slate-900 self-baseline font-semibold max-sm:text-lg">
                    Bipin Singh
                    <span className="text-4xl text-[#FAAD1B]">.</span>
                  </h1>
                </div>
              </div>
              <p className="max-w-md text-gray-600 mb-4 text-xl max-sm:text-base">
                As a proficient full stack developer specializing in dynamic web
                applications with expertise in JavaScript, React, React Native
                and Node.js.
              </p>
              <div className="flex space-x-4">
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
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4 max-sm:text-xl">
                Navigation
              </h3>
              <ul className="space-y-2 flex flex-col gap-4">
                {["home", "service", "about", "skills", "project"].map(
                  (section) => (
                    <a key={section} href={`#${section}`}>
                      <li
                        className={`text-xl cursor-pointer hover:text-[#FAAD1B] transition-all duration-300 max-sm:text-base`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </li>
                    </a>
                  )
                )}
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4 max-sm:text-xl">
                Contact
              </h3>
              <ul className="space-y-2">
                <div className="flex gap-2">
                  <IoMdCall size={25} />
                  <li className="text-xl max-sm:text-base">
                    +91 7303 296 6676
                  </li>
                </div>
                <div className="flex gap-2">
                  <MdEmail size={25} />
                  <li className="text-xl max-sm:text-base">
                    vsinghvipin333@gmail.com
                  </li>
                </div>
                <div className="flex gap-2">
                  <FaLocationDot size={25} />
                  <li className="text-xl max-sm:text-base">
                    Sector 49, Hanuman Vihar, <br />
                    Noida Gautam Budh Nagar, <br /> Uttar Pradesh <br /> Pincode
                    : 201304
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <footer
        className={`${
          loading ? "hidden" : undefined
        } bg-[#344C36] text-white font-medium w-full p-4 max-xl:${
          blur && "blur"
        }`}
      >
        <h1 className="text-center text-2xl  max-sm:text-sm ">
          Copyright &copy; {currentYear} . All Right Reserved.
        </h1>
      </footer>
    </>
  );
};

export default Footer;
