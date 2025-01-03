import { Icon } from "@iconify/react";
import { Centered } from "../components/Centered";

type TechnologiesType = {
  name: string;
  logo: string;
  url: string;
};

const technologies = [
  {
    name: "Vite",
    logo: "logos:vitejs",
    url: "https://vitejs.dev/guide/why.html",
  },
  { name: "React", logo: "devicon:react", url: "https://reactjs.org/" },
  {
    name: "TypeScript",
    logo: "logos:typescript-icon",
    url: "https://www.typescriptlang.org/",
  },
  // {
  //   name: "Jotai",
  //   logo: "noto:letter-j",
  //   url: "https://jotai.org/",
  // },
  {
    name: "wouter",
    logo: "noto:letter-w",
    url: "https://github.com/molefrog/Wouter",
  },
  {
    name: "daisyUI",
    logo: "logos:daisyui-icon",
    url: "https://daisyui.com/",
  },
  {
    name: "TailwindCSS",
    logo: "logos:tailwindcss-icon",
    url: "https://tailwindcss.com/docs/installation",
  },
  {
    name: "Iconify",
    logo: "line-md:iconify2",
    url: "https://iconify.design/",
  },
];

const techDiv = (tech: TechnologiesType) => (
  <div
    key={tech.name}
    className="min-w-[100px] min-h-[100px] max-w-[148px] max-h-[148px] w-[10vw] h-[10vw] aspect-square m-2"
  >
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square h-full flex items-center justify-center">
            <Icon
              icon={tech.logo}
              className="w-full h-full object-contain text-primary"
            />
          </div>
        </div>
      </div>
      {/* <div className="text-lg text-center mt-2"> */}
      <div className="text-lg text-center mt-2 tracking-wider">
        {tech.name}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <Centered>
      <div className="grid grid-cols-4 auto-cols-[minmax(100px,1fr)]">
        {technologies.map((tech) => techDiv(tech))}
      </div>
    </Centered>
  );
}
