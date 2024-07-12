import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/features/userSlice";
import { apiServices } from "../../services/api_services";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";

const ContactUs = ({ blur, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const contactUsHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        message: message,
      };

      dispatch(userAction.contactUsRequest());
      const { data } = await apiServices.contactUs(payload);
      dispatch(userAction.contactUsSuccess(data.message));
      setOpen(!open);
    } catch (error) {
      dispatch(userAction.contactUsfailure(error.response.data.message));
    }
  };
  return (
    <>
      <div
        id="contact"
        className={` ${
          loading ? "hidden" : undefined
        } h-full w-screen flex flex-col py-3 justify-center items-center gap-10 max-lg:h-full max-lg:py-3 ${
          blur && "max-xl:blur"
        }`}
      >
        <div className="flex flex-col items-center text-center gap-2 ">
          <div className="flex gap-1 items-center">
            <h1 className="font-semibold text-4xl text-[#FAAD1B]">-</h1>
            <h1 className="text-3xl font-medium text-slate-900 max-sm:text-2xl">
              Contact Us
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[#FAAD1B] font-medium text-5xl max-lg:text-4xl max-sm:text-2xl">
              <span className=" text-slate-900 font-semibold ">
                Lets Talk for
              </span>{" "}
              your
            </h1>
            <h1 className="text-[#FAAD1B]  font-medium text-5xl max-lg:text-4xl max-sm:text-xl">
              Next Project
            </h1>
          </div>
        </div>
        <form
          className="w-[64%] flex flex-col gap-2  max-lg:w-[95%]"
          onSubmit={contactUsHandler}
        >
          <div className="flex flex-col">
            <h1 className=" text-lg font-medium text-slate-900">Your Name*</h1>
            <input
              className="border flex-1 px-1 py-4 rounded-lg outline-none"
              type="text"
              placeholder="Ex. Bipin Singh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <h1 className=" text-lg font-medium text-slate-900">Email*</h1>
            <input
              className="border flex-1 px-1 py-4 rounded-lg outline-none"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <h1 className=" text-lg font-medium text-slate-900">Phone*</h1>
            <input
              className="border flex-1 px-1 py-4 rounded-lg outline-none"
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <h1 className=" text-lg font-medium text-slate-900">Message*</h1>
            <textarea
              className="border flex-1 rounded-lg px-1 py-4 outline-none"
              rows={10}
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="self-center" type="submit">
            <div className="flex bg-[#FAAD1B] gap-1  p-1 rounded-full cursor-pointer ">
              <div className="flex-1">
                <div className="bg-[#344C36] h-full flex items-center justify-center px-6 rounded-full">
                  <h1 className="text-white  font-semibold text-xl max-sm:text-sm">
                    Submit
                  </h1>
                </div>
              </div>
              <div className="bg-white p-5 rounded-full ">
                <FaArrowRightLong size={20} />
              </div>
            </div>
          </button>
        </form>
      </div>
      <div
        className={`${loading ? "hidden" : undefined} relative h-28 ${
          blur && "max-xl:blur"
        }`}
      >
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
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="h-[400px] flex flex-col items-center justify-center gap-3">
          <FaCircleCheck color="#344C36" size={150} />
          <h1 className="font-semibold text-2xl text-center text-[#FAAD1B]">
            Message sent <br /> You have been replied shortly
          </h1>
          <div
            className="bg-[#344C36] w-56 h-16 rounded-xl font-semibold text-xl text-white flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            OK
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ContactUs;
