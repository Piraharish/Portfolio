import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Education from "./components/education/Education";
import Skills from "./components/skills/Skills";
// import Projects from "./components/projects/Projects";
// import Courses from "./components/courses/Courses";
const Projects = lazy(() => import("./components/projects/Projects"));
const Courses = lazy(() => import("./components/courses/Courses"));
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Loader from "./components/handlers/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <About />
      <Education />
      <Skills />
      {/* <Projects />
      <Courses /> */}
      <Suspense fallback={<Loader />}>
        <Projects />
        <Courses />
      </Suspense>
      <Contact />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
