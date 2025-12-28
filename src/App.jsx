import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';



const App = () => {
  return (
    <div className="container mx-auto">
      {/* <SplashCursor /> */}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
