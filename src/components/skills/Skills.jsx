import useFetch from "../../hooks/useFetch";
import { BsPatchCheckFill } from "react-icons/bs";
import "./skills.css";

const Skills = () => {
  const { loading, error, data } = useFetch(
    `${import.meta.env.VITE_APP_STRAPI_API_BASE_URL}/api/portfolio-skills`
  );

  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching Skills Data : ", error);
    return null;
  }
  const skillsData = data?.data?.data?.[0].attributes?.skills || [];

  return (
    <section id="skills">
      <h5>Tech Stacks I&apos;ve used</h5>
      <h2>My Skills</h2>

      <div className="container skill__container">
        {skillsData.map((category, index) => (
          <div className="skill__category" key={index}>
            <h3>{category.category}</h3>
            <div className="skill__content">
              {category.list &&
                category.list.map((skill, skillIndex) => (
                  <article className="skill__details" key={skillIndex}>
                    <BsPatchCheckFill className="skill__details-icon" />
                    <h4>{skill}</h4>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
