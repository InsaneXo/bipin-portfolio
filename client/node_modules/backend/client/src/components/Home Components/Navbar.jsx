import React, { useState, useEffect } from "react";
import { BsBootstrap } from "react-icons/bs";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { bgBlurAction } from "../../redux/features/bgBlur";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";
import { useNavigate } from "react-router-dom";
import Loading from "../Dashboard Components/Loading";

const Navbar = ({ loading }) => {
  const [activeTab, setActiveTab] = useState("#home");
  const [sideMenu, setSideMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error } = useSelector((store) => store.user);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
      };
      dispatch(userAction.signInRequest());
      const { data } = await apiServices.signIn(payload);
      dispatch(userAction.signInSuccess(data.message));
      navigate("/");
    } catch (error) {
      dispatch(userAction.signInFailure(error.response.data.message));
    }
  };
  const handleBackBtn = () => {
    setOpen(!open);
    setSideMenu(!sideMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "service",
        "about",
        "skills",
        "project",
        "academic",
        "contact",
      ];
      let currentSection = "#home";

      if (window.scrollY === 0) {
        // If scrolled to the top, set active tab to home
        setActiveTab("#home");
        return;
      }

      // Find the last section that has been scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = `#${sections[i]}`;
            break;
          }
        }
      }

      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(bgBlurAction.bgBlur(sideMenu));
  }, [sideMenu, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-24  backdrop-blur-md fixed top-0 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center max-sm:h-20">
      <div className="bg-[#344C36] w-[90%] h-20 rounded-full flex items-center justify-between px-2 max-md:rounded-none max-md:px-1 max-md:w-full max-md:h-24 max-sm:h-20">
        <div className="flex gap-2 items-center justify-center cursor-pointer">
          <div className="h-14 w-14 bg-[#FAAD1B] rounded-full flex items-center justify-center">
            <BsBootstrap size={35} color="#344C36" />
          </div>
          <h1 className="text-2xl text-white self-baseline font-semibold max-sm:text-lg">
            Bipin Singh<span className="text-4xl text-[#FAAD1B] ">.</span>
          </h1>
        </div>
        <div className="max-xl:hidden">
          <ul className="flex gap-8 ">
            {["home", "service", "about", "skills", "project", "academic"].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setActiveTab(`#${section}`)}
                >
                  <li
                    className={`text-xl cursor-pointer hover:text-[#FAAD1B] transition-all duration-300  ${
                      activeTab === `#${section}`
                        ? "text-[#FAAD1B] border-b border-[#FAAD1B]"
                        : "text-white"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </li>
                </a>
              )
            )}
          </ul>
        </div>
        <div
          className={`absolute right-0 overflow-auto top-2 hidden bg-[#344C36] bg-opacity-50 h-screen transition-all rounded-t-2xl rounded-b-2xl duration-300 max-md:top-0 max-xl:block ${
            sideMenu ? "px-3 w-[50%]" : "w-0"
          } backdrop-blur-lg shadow-lg`}
        >
          <div
            className="w-full h-24  flex items-center justify-between"
            onClick={() => setSideMenu(!sideMenu)}
          >
            <h1 className="text-lg text-white font-medium">Menu</h1>
            <RxCross2 color="white" size={30} className="cursor-pointer" />
          </div>
          <ul className="flex flex-col gap-10">
            {[
              "home",
              "service",
              "about",
              "skills",
              "project",
              "academic",
              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setActiveTab(`#${section}`)}
              >
                <li
                  className={`text-xl cursor-pointer hover:text-[#FAAD1B] transition-all duration-300  ${
                    activeTab === `#${section}`
                      ? "text-[#FAAD1B] border-[#FAAD1B]"
                      : "text-white"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </li>
              </a>
            ))}
            <li className="text-xl text-white" onClick={() => setOpen(!open)}>
              Dashboard
            </li>
          </ul>
        </div>
        <div className="flex gap-3 ">
          <a href="#contact">
            <div className="bg-white px-5 py-4 rounded-full cursor-pointer max-xl:hidden text-[#344C36] hover:bg-[#FAAD1B] hover:text-white transition-all duration-300">
              <h1 className="font-semibold text-xl">Contact Me</h1>
            </div>
          </a>
          <div
            className="bg-white px-5 py-4 rounded-full cursor-pointer max-xl:hidden text-[#344C36] hover:bg-[#FAAD1B] hover:text-white transition-all duration-300"
            onClick={() => setOpen(!open)}
          >
            <h1 className="font-semibold text-xl">Dashboard</h1>
          </div>
          <div
            className="h-14 w-14 bg-white rounded-full hidden items-center justify-center cursor-pointer max-xl:flex"
            onClick={() => setSideMenu(!sideMenu)}
          >
            <RiMenu3Fill fontWeight={500} size={28} color="#344C36" />
          </div>
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="w-full p-3 hidden max-sm:block">
          <div onClick={handleBackBtn}>
            <IoMdArrowRoundBack color="black" size={30} />
          </div>
        </div>
        <div className="h-[600px] p-10">
          <div className="flex items-center  flex-col cursor-pointer">
            <div className="h-14 w-14 bg-[#FAAD1B] rounded-full flex items-center justify-center">
              <BsBootstrap size={35} color="#344C36" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl text-slate-900 self-baseline font-semibold max-sm:text-lg">
                Bipin Singh<span className="text-4xl text-[#FAAD1B] ">.</span>
              </h1>
              <p className="text-lg">Admin Panel</p>
            </div>
          </div>
          <form className="my-5" onSubmit={handleSignIn}>
            <div className="mb-3">
              <h1>Registered Email</h1>
              <input
                className="border w-full h-14 rounded-lg px-2"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-10 ">
              <h1>Password</h1>
              <input
                className="border w-full h-14 rounded-lg px-2"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex bg-[#FAAD1B] gap-1  p-1 rounded-full cursor-pointer ">
              <button type="submit" className="flex-1">
                <div className="bg-[#344C36] h-14 flex items-center justify-center px-3 rounded-full">
                  <h1 className="text-white  font-semibold text-xl max-sm:text-base">
                    Sign In
                  </h1>
                </div>
              </button>
            </div>
          </form>

          {error === "Unauthorized Access" ? (
            <h1></h1>
          ) : (
            <h1
              className={`text-center mb-3 ${error && "text-red-600"} ${
                message && "text-black"
              }`}
            >
              {error}
            </h1>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Navbar;
