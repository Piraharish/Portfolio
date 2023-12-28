import useFetch from "../../hooks/useFetch";
import logo from "/favicon.png";
import { Link as ScrollLink } from "react-scroll";
import "./footer.css";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  // Array of objects for Permalinks
  const links = [
    { to: "about", text: "About" },
    { to: "education", text: "Education" },
    { to: "skills", text: "Skills" },
    { to: "projects", text: "Projects" },
    { to: "courses", text: "Courses" },
    { to: "contact", text: "Contact" },
  ];

  const { loading, error, data } = useFetch(
    `${
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL ||
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL_LOCAL
    }/api/portfolio-footers?populate=*`
  );
  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching Footer Data : ", error);
    return null;
  }
  const footerData = data?.data?.data?.[0]?.attributes || [];
  const logoUrl =
    import.meta.env.VITE_APP_STRAPI_API_BASE_URL +
    footerData?.Logo?.data?.attributes?.url;

  return (
    <footer id="footer">
      <h5 className="footer__devby">Developed by</h5>
      <ScrollLink to={"/"} smooth={true} spy={true}>
        <img src={logoUrl || logo} alt="icon" />
      </ScrollLink>
      <h2 className="footer__dev">Piraharish</h2>

      <ul className="permalinks">
        {links.map((link, index) => (
          <li key={index}>
            <ScrollLink to={link.to} smooth={true} spy={true}>
              {link.text}
            </ScrollLink>
          </li>
        ))}
      </ul>

      <div className="footer__socials">
        {footerData.Socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon === "FaFacebookF" && <FaFacebookF />}
            {social.icon === "FiInstagram" && <FiInstagram />}
            {social.icon === "FaXTwitter" && <FaXTwitter />}
            {social.icon === "FaLinkedinIn" && <FaLinkedinIn />}
          </a>
        ))}
      </div>

      <div className="scroll__up">
        <ScrollLink to="/" smooth={true} spy={true}>
          Scroll Up&nbsp;&rarr;
        </ScrollLink>
      </div>

      <div className="footer__copyright">
        <small>&copy;&nbsp;Piraharish. All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
