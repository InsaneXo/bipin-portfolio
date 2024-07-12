import React, { useEffect, useState } from "react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import ProjectCard from "./ProjectCard";
import MessagesCard from "./MessagesCard";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Dashboard = () => {
  const { profile, loading } = useSelector((store) => store.user);
  const { loading: projectLoading } = useSelector((store) => store.project);
  const { loading: messageLoading } = useSelector((store) => store.message);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const hrs = currentTime.getHours();
  const min = currentTime.getMinutes();
  const day = currentTime.getDay();
  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = currentTime.getDate();
  const month = currentTime.getMonth();
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let status = "";
  let greet = "";

  if (hrs >= 5 && hrs <= 11) {
    greet = "Good Morning";
  } else if (hrs >= 12 && hrs <= 18) {
    greet = "Good Afternoon";
  } else {
    greet = "Good Evening";
  }

  let displayHours = hrs % 12 || 12; // Convert 24-hour format to 12-hour format
  status = hrs >= 12 ? "PM" : "AM";

  displayHours = displayHours < 10 ? `0${displayHours}` : displayHours;
  const displayMinutes = min < 10 ? `0${min}` : min;
  const displayDate = date < 10 ? `0${date}` : date;

  if (loading || projectLoading || messageLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 overflow-auto max-md:mb-20">
      <div className="w-full bg-[#F5F5F5]  flex items-center justify-between px-3 mb-2 max-md:flex-col max-md:gap-1">
        <div>
          <h1 className="font-semibold text-3xl max-md:text-xl">{`${displayHours}:${displayMinutes} ${status}`}</h1>
          <h1 className="text-lg">{`${dayList[day]} ${displayDate} ${monthList[month]}`}</h1>
        </div>
        <div>
          <h1 className="font-medium text-xl">{greet}, Bipin</h1>
        </div>
      </div>
      <div className="text-center hidden max-md:block">
        <h1 className="font-semibold text-[#FAAD1B] text-2xl ">Admin Panel</h1>
      </div>
      {profile && (
        <div className="px-3">
          <div className="flex gap-4 mb-3 max-md:flex-col">
            <div className=" flex-1 flex flex-col items-center justify-center gap-4 h-[500px] bg-[#344C36] rounded-xl px-4 max-md:flex-none">
              <div>
                <h1 className="text-white text-5xl font-medium flex ">
                  <span>
                    <MdOutlineWorkspacePremium />
                  </span>{" "}
                  Projects
                </h1>
              </div>
              <div>
                <h1 className="text-[#FAAD1B] text-5xl font-semibold ">
                  {profile.projects.length < 10
                    ? `0${profile.projects.length}`
                    : profile.projects.length}
                </h1>
              </div>
            </div>
            <div className=" flex-1 flex flex-col items-center justify-center gap-4 h-[500px] bg-[#344C36] rounded-xl px-4 max-md:flex-none">
              <div>
                <h1 className="text-white text-5xl font-medium flex ">
                  <span>
                    <IoMdMail />
                  </span>{" "}
                  Messages
                </h1>
              </div>
              <div>
                <h1 className="text-[#FAAD1B] text-5xl font-semibold  ">
                  {" "}
                  {profile.messages.length < 10
                    ? `0${profile.messages.length}`
                    : profile.messages.length}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <div className="">
              <div className="flex items-center max-md:justify-center">
                <MdOutlineWorkspacePremium size={35} color="#FAAD1B" />
                <h1 className="text-[#FAAD1B] text-3xl font-medium flex my-3">
                  Projects
                </h1>
              </div>
              {profile.projects.length === 0 && (
                <div className="w-full h-40 bg-[#F5F5F5] flex flex-col items-center justify-center">
                  <MdOutlineWorkspacePremium size={35} color="#FAAD1B" />
                  <h1 className="font-semibold text-center text-gray-400 text-xl">
                    No Project Yet. Click "Add Project" <br /> to start defining
                    details and objectives.
                  </h1>
                </div>
              )}

              {profile.projects.map((item) => (
                <ProjectCard
                  key={item._id}
                  projectId={item._id}
                  projectTitle={item.projectTitle}
                  projectImage={item.projectImage.url}
                  techStack={item.techStack}
                  createdAt={item.createdAt}
                  projectLink={item.projectLink}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center max-md:justify-center">
                <IoMdMail size={35} color="#FAAD1B" />
                <h1 className="text-[#FAAD1B] text-3xl font-medium flex my-3">
                  {" "}
                  Messages
                </h1>
              </div>
              {profile.messages.length === 0 && (
                <div className="w-full h-40 bg-[#F5F5F5] flex flex-col items-center justify-center mb-1">
                  <MdOutlineWorkspacePremium size={35} color="#FAAD1B" />
                  <h1 className="font-semibold text-center text-gray-400 text-xl">
                    No Message Yet.
                  </h1>
                </div>
              )}
              {profile.messages.map((item) => (
                <MessagesCard
                  key={item._id}
                  messageId={item._id}
                  name={item.name}
                  message={item.message}
                  createdAt={item.createdAt}
                  phoneNo={item.phoneNo}
                  email={item.email}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
