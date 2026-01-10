import { Particles } from "../components/Particles";
import { Timeline } from "../components/Timeline";
import { education } from "../constants";

const Education = () => {
  return (
    // 1. 'relative' establishes a boundary for the absolute background
    <div className="w-full relative overflow-hidden" id="education">

      <div className="absolute inset-0 z-0">
                <Particles
                    className="absolute inset-0"
                    quantity={400}
                    ease={500}
                    color="#22c55e" 
                    shape="square"  
                    vx={0.5}
                    vy={-0.5} 
                />
        </div>
      
      {/* 2. Position the background absolutely to cover the entire parent */}
      {/* '-z-10' ensures it stays behind the Timeline content */}
      

      {/* 3. The Timeline sits naturally on top */}
      <div className="relative z-10">
        <Timeline data={education} />
      </div>
    </div>
  );
};

export default Education;