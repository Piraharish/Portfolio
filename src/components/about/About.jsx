import useFetch from "../../hooks/useFetch";
import "./about.css";
import { Link as ScrollLink } from "react-scroll";
import { FaUserGraduate } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { BsGlobe2 } from "react-icons/bs";

const About = () => {
  const { loading, error, data } = useFetch(
    `${
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL
    }/api/portfolio-abouts?populate=*`
  );
  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching About Data : ", error);
    return null;
  }
  const aboutData = data?.data?.data?.[0]?.attributes;
  const aboutImage = aboutData?.About_Image?.data?.attributes?.url;
  const aboutParagraph = aboutData?.aboutParagraph?.[0]?.paragraph || [];

  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={aboutImage} alt="About-Pic" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            {aboutData?.aboutData.map((item) => (
              <article className="about__card" key={item.id}>
                {item.icon === "FaUserGraduate" && (
                  <FaUserGraduate className="about__icon" />
                )}
                {item.icon === "FiInfo" && <FiInfo className="about__icon" />}
                {item.icon === "BsGlobe2" && (
                  <BsGlobe2 className="about__icon" />
                )}
                <h5>{item.title}</h5>
                <small>{item.description}</small>
              </article>
            ))}
          </div>
          <p>{aboutParagraph}</p>
          <ScrollLink
            to="contact"
            smooth={true}
            spy={true}
            className="btn btn-primary"
          >
            Let&apos;s Connect&nbsp;&rarr;
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default About;
