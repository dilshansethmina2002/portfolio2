"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      // UPDATED: Added 'bg-transparent' to ensure no color blocks the shader
      // Also ensuring w-full is present
      className="w-full c-space section-spacing bg-transparent"
      ref={containerRef}
    >
      <h1 className="mb-4 text-4xl font-extrabold tracking-tighter text-center text-white md:text-6xl lg:text-7xl">
            My {" "}
            <span className="bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Education
            </span>
      </h1>

      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Sticky Date/Title Section */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              
              {/* Dot Indicator */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-midnight flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              
              {/* Desktop Title */}
              <div className="hidden md:block md:pl-20">
                <h3 className="text-xl md:text-4xl font-bold text-neutral-300">
                  {item.date}
                </h3>
                <h3 className="text-3xl text-neutral-400 font-bold mt-1">
                  {item.title}
                </h3>
                <h3 className="text-2xl text-neutral-500 mt-1">
                  {item.job}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Mobile Title */}
              <div className="md:hidden block mb-4 text-left">
                <h3 className="text-2xl font-bold text-neutral-300">
                  {item.date}
                </h3>
                <h3 className="text-xl font-bold text-neutral-500 mb-2">
                  {item.title}
                </h3>
                <h3 className="text-lg text-neutral-500">
                  {item.job}
                </h3>
              </div>
              
              {/* Description Points */}
              {item.contents.map((content, idx) => (
                <p 
                  key={idx} 
                  className="text-neutral-400 font-normal mb-3 text-base"
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Vertical Line Background */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Animated Gradient Line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};