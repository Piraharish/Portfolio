import useFetch from "../../hooks/useFetch";
import { TypeAnimation } from "react-type-animation";
import Loader from "../handlers/Loader";
import Error from "../handlers/Error";
import "./header.css";
import { Link as ScrollLink } from "react-scroll";
import { FiDownload } from "react-icons/fi";
import HeaderSocials from "./HeaderSocials";
import CV from "/Resume.pdf";
import PropTypes from "prop-types";

const CTA = ({ pdfUrl }) => {
  let cvUrl;

  if (pdfUrl) {
    cvUrl = pdfUrl;
  } else {
    cvUrl = CV;
  }
  return (
    <div className="cta">
      <a
        href={cvUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        <FiDownload style={{ marginBottom: "-0.2rem" }} />
        &nbsp;Download CV
      </a>
      <ScrollLink
        to="contact"
        spy={true}
        smooth={true}
        className="btn btn-primary"
      >
        Let&apos;s Connect&nbsp;&rarr;
      </ScrollLink>
    </div>
  );
};

const Header = () => {
  const { loading, error, data } = useFetch(
    `${
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL
    }/api/portfolio-headers?populate=*`
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.error("Error fetching the Home Data", error);
    return <Error />;
  }
  const headerData = data?.data?.data?.[0]?.attributes || [];

  return (
    <header id="/">
      <div className="container header__container">
        <h5>Hello I&apos;m</h5>
        <h1>Piraharish</h1>
        <h5 className="text-light">
          &#123;&nbsp;
          <TypeAnimation
            sequence={[
              "Freelance Fullstack Developer",
              2000,
              "",
              2000,
              "Tech Enthusiast",
              2000,
              "",
              2000,
              "Aspiring Developer",
              2000,
              "",
              2000,
              "MCA Graduate",
              2000,
              "",
              2000,
            ]}
            speed={{ type: "keyStrokeDelayInMs", value: 100 }}
            deletionSpeed={{ type: "keyStrokeDelayInMs", value: 50 }}
            cursor={true}
            repeat={Infinity}
          />
          &nbsp;&#125;
        </h5>
        <CTA pdfUrl={headerData?.PDF?.data?.attributes?.url} />
        <HeaderSocials socialLinksData={headerData.socialLinks} />

        <div className="me">
          <img
            src={headerData?.Image?.data?.attributes?.url}
            alt="me"
            className="me__image"
          />
        </div>
        <ScrollLink
          to="footer"
          spy={true}
          smooth={true}
          className="scroll__down"
        >
          Scroll Down&nbsp;&rarr;
        </ScrollLink>
      </div>
    </header>
  );
};
CTA.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};
export default Header;
