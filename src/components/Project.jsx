import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsHidden(true)}
          className="group flex items-center gap-2 cursor-pointer bg-slate-900 text-cyan-400 border border-cyan-900/50 px-5 py-2 rounded-full font-semibold uppercase tracking-wider transition-all hover:bg-slate-800 hover:text-cyan-300 hover:border-cyan-500 shadow-[0_0_10px_-3px_rgba(6,182,212,0.5)] hover:shadow-[0_0_15px_-1px_rgba(6,182,212,0.8)]"
        >
          Read More
          <img
            src="assets/arrow-right.svg"
            className="w-5 transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
        
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
