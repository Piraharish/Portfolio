import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./contact.css";
import { MdOutlineEmail, MdSend } from "react-icons/md";
import { RiMessengerLine, RiLoader2Line } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "animate.css";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, data } = useFetch(
    `${import.meta.env.VITE_APP_STRAPI_API_BASE_URL}/api/portfolio-contacts?`
  );
  if (loading) {
    return null;
  }
  if (error) {
    console.error("Error Fetching Contacts : ", error);
    return null;
  }
  const contactOptions =
    data?.data?.data?.[0]?.attributes?.contactOptions || [];

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Piraharish",
          from_email: form.email,
          to_email: "piraharish.s@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "Successfully Sent",
            text: "Thank you. I will get back to you as soon as possible.",
            width: "auto",
            padding: "5rem",
            allowEscapeKey: true,
            allowEnterKey: true,
            confirmButtonText: "Okay&nbsp;&#129309;&#127996",
            confirmButtonColor: "var(--color-primary)",
            color: "var(--color-primary)",
            background: "var(--color-bg)",
            backdrop: "rgba(0,0,0,0.5)",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setIsLoading(false);
          console.error(error);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ahh, something went wrong. Please try again.",
            width: "auto",
            padding: "5rem",
            allowEscapeKey: true,
            allowEnterKey: true,
            confirmButtonText: "Try again later !",
            confirmButtonColor: "var(--color-bg-variant)",
            color: "var(--color-white)",
            background: "var(--color-bg)",
            backdrop: "rgba(0,0,0,0.5)",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
      );
  };

  return (
    <section id="contact">
      <h5>Get in Touch</h5>
      <h2>Contact</h2>

      <div className="container contact__container">
        {/* Contact Options */}
        <div className="contact__options">
          {contactOptions?.map((option, index) => (
            <article key={index} className="contact__option">
              {option.icon === "MdOutlineEmail" && (
                <MdOutlineEmail className="contact__option-icon" />
              )}
              {option.icon === "RiMessengerLine" && (
                <RiMessengerLine className="contact__option-icon" />
              )}
              {option.icon === "BsWhatsapp" && (
                <BsWhatsapp className="contact__option-icon" />
              )}
              <h4>{option.heading}</h4>
              <h5>{option.detail}</h5>
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                {option.btnText}&nbsp;&rarr;
              </a>
            </article>
          ))}
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="What's Your Good Name?"
            required
            autoComplete="username"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="What's Your Email?"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="7"
            placeholder="What you want to say?"
            required
            value={form.message}
            onChange={handleChange}
          />
          <div className="send__btn">
            <button type="submit" className="btn btn-primary">
              {isLoading ? (
                <>
                  Sending...&nbsp;&nbsp;
                  <RiLoader2Line className="send__icon load__rotate" />
                </>
              ) : (
                <>
                  Send&nbsp;&nbsp;
                  <MdSend className="send__icon" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
