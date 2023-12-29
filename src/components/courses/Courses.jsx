import "./courses.css";
import useFetch from "../../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Courses = () => {
  const { loading, error, data } = useFetch(
    `${
      import.meta.env.VITE_APP_STRAPI_API_BASE_URL
    }/api/portfolio-courses?populate=*`
  );
  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching Courses Data : ", error);
    return null;
  }
  const courseData = data?.data?.data;

  return (
    <section id="courses">
      <h5>Other Learnings</h5>
      <h2>Certified Courses</h2>

      <Swiper
        className="container courses__container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {courseData.map((course) => (
          <SwiperSlide className="courses" key={course.id}>
            <div className="course__avatar">
              <img
                src={`${course?.attributes?.Avatar?.data?.attributes?.url}`}
                alt={`Course Avatar ${course.id}`}
              />
            </div>
            <h5 className="course__name">{course?.attributes?.name}</h5>
            <h6 className="course__org">&#64;{course?.attributes?.org}</h6>
            <small className="course__about">
              &ldquo;{course?.attributes?.about}&rdquo;
            </small>
            <a
              href={course?.attributes?.link}
              className="btn btn-primary course__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential&nbsp;&rarr;
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Courses;
