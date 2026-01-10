import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import AchivementAndActivity from "./sections/AchivementAndActivity";


const App = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <AchivementAndActivity />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
