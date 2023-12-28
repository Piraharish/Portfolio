import { useState, useEffect } from "react";
import "./navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { GiGraduateCap } from "react-icons/gi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaCode, FaCodepen } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeNav, setActiveNav] = useState("/");
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        const top = section.offsetTop - navHeight;
        const bottom = top + section.offsetHeight;
        if (position >= top && position < bottom) {
          setActiveNav(`/${section.id}`);
        }
      });
    };

    const handleResize = () => {
      setNavHeight(document.getElementById("navbar").offsetHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial setup
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [navHeight]);

  return (
    <nav id="navbar">
      <ScrollLink to="/" smooth={true} spy={true}>
        <AiOutlineHome />
      </ScrollLink>
      <ScrollLink to="about" smooth={true} spy={true}>
        <AiOutlineUser />
      </ScrollLink>
      <ScrollLink to="education" smooth={true} spy={true}>
        <GiGraduateCap />
      </ScrollLink>
      <ScrollLink to="skills" smooth={true} spy={true}>
        <FaCode />
      </ScrollLink>
      <ScrollLink to="projects" smooth={true} spy={true}>
        <FaCodepen />
      </ScrollLink>
      <ScrollLink to="courses" smooth={true} spy={true}>
        <PiCertificateBold />
      </ScrollLink>
      <ScrollLink to="contact" smooth={true} spy={true}>
        <BiMessageSquareDetail />
      </ScrollLink>
    </nav>
  );
};

export default Navbar;
