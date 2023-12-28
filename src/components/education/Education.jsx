import useFetch from "../../hooks/useFetch";
import { BiCheck } from "react-icons/bi";
import "./education.css";

const Education = () => {
  const { loading, error, data } = useFetch(
    `${import.meta.env.VITE_APP_STRAPI_API_BASE_URL}/api/portfolio-educations`
  );

  if (error) {
    console.error("Error Fetching Education Data : ", error);
    return null;
  }
  if (loading) {
    return null;
  }
  const educationData = data?.data?.data?.[0]?.attributes?.educationData || [];

  return (
    <section id="education">
      <h5>Academic Journey So Far</h5>
      <h2>Education</h2>

      <div className="container education__container">
        {educationData.map((education, index) => (
          <article className="education" key={index}>
            <div className="education__head">
              <h3>{education.degree}</h3>
              <h4>{education.college}</h4>
            </div>

            <ul className="education__list">
              {education.points.map((point, idx) => (
                <li key={idx}>
                  <BiCheck className="education__list-icon" />
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
