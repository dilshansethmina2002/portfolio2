import ReflectBackground from "../components/ReflectBackground";
import { Timeline } from "../components/Timeline";
import { education } from "../constants";

const Education = () => {
  return (
    // 1. 'relative' establishes a boundary for the absolute background
    <div className="w-full relative overflow-hidden" id="work">
      
      {/* 2. Position the background absolutely to cover the entire parent */}
      {/* '-z-10' ensures it stays behind the Timeline content */}
      <ReflectBackground 
        backdropBlurAmount="md" 
        className="absolute inset-0 -z-10"
      />

      {/* 3. The Timeline sits naturally on top */}
      <div className="relative z-10">
        <Timeline data={education} />
      </div>
    </div>
  );
};

export default Education;