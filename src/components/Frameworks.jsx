import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "AWS",
    "MongoDB",
    "Node.js",
    "csharp",
    "css3",
    "Canva",
    "Docker",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "react",
    "Dart",
    "tailwindcss",
    "vitejs",
    "Kotlin",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={4}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-400 rounded-sm hover:scale-140" />
);
