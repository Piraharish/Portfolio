import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Modal from "react-modal";
import { BsGithub } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "./projects.css";
import "./modal.css";

const Projects = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { loading, error, data } = useFetch(
    `${
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL
    }/api/portfolio-projects?populate=*`
  );
  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching Projects Data : ", error);
    return null;
  }
  const projectData = data?.data?.data || [];

  const openModal = (project) => {
    if (!modalIsOpen) {
      const imagesData = project?.attributes?.images?.data;
      setSelectedProject(imagesData);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  const customModal = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 3,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "58rem",
      width: "100%",
      background: "var(--color-bg)",
      padding: "0.5rem",
      border: "1px solid var(--color-primary)",
      borderRadius: "1rem",
    },
  };

  return (
    <section id="projects">
      <h5>My Works</h5>
      <h2>Projects</h2>

      <div className="container projects__container">
        {projectData.map((project) => (
          <article className="project__items" key={project?.id}>
            <div
              className="project__item-image"
              onClick={() => openModal(project)}
            >
              <img
                src={`${import.meta.env.VITE_APP_STRAPI_API_BASE_URL}${
                  project?.attributes?.image?.data?.attributes?.url
                }`}
                alt={`Project ${project?.id}`}
              />
              <IoMdPhotos className="photo__icon" />
            </div>
            <h3>{project?.attributes?.title}</h3>
            <div className="project__item-cta">
              <a
                href={project?.attributes?.github}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub style={{ marginBottom: "-0.2rem" }} />
                &nbsp;Github
              </a>
              {project?.attributes?.demo && (
                <a
                  href={project?.attributes?.demo}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo&nbsp;&rarr;
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Slider Modal"
        style={customModal}
      >
        <button onClick={closeModal} className="close-btn">
          <MdClose />
        </button>
        <Swiper
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="swiper-container-modal"
        >
          {selectedProject &&
            selectedProject.map((imageData, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${import.meta.env.VITE_APP_STRAPI_API_BASE_URL}${
                    imageData?.attributes?.url
                  }`}
                  alt={`Image ${index + 1}`}
                  className="modal-image"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Modal>
    </section>
  );
};

export default Projects;
