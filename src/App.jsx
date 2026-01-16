import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import AchivementAndActivity from "./sections/AchivementAndActivity";
import { Preload } from "@react-three/drei";
import Preloader from "./components/Preloader";


const App = () => {
  return (
    <div className="w-full">
      <Preloader />
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
