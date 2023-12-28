import { BsGithub, BsLinkedin } from "react-icons/bs";
import PropTypes from "prop-types";

const HeaderSocials = ({ socialLinksData }) => {
  const linksArray = Array.isArray(socialLinksData)
    ? socialLinksData
    : Object.values(socialLinksData);
  return (
    <div className="header__socials">
      {linksArray?.map((link) => (
        <a
          key={link.id}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.platform === "Linkedin" ? <BsLinkedin /> : <BsGithub />}
        </a>
      ))}
    </div>
  );
};
HeaderSocials.propTypes = {
  socialLinksData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

export default HeaderSocials;
