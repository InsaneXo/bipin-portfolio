import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Home from "./Home";
import Service from "./Service";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import EducationAndWork from "./EducationAndWork";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const Main = () => {
  const { blur } = useSelector((store) => store.bgBlur);
  const { loading } = useSelector((store) => store.user);

  return (
    <>
      <div>
        <Navbar loading={loading} />
        <Home blur={blur} loading={loading} />
        <Service blur={blur} loading={loading} />
        <About blur={blur} loading={loading} />
        <Skills blur={blur} loading={loading} />
        <Projects blur={blur} loading={loading} />
        <EducationAndWork blur={blur} loading={loading} />
        <ContactUs blur={blur} loading={loading} />
        <Footer blur={blur} loading={loading} />
      </div>
    </>
  );
};

export default Main;
