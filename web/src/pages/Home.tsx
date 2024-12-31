import { Centered } from "../components/Centered";

type TechnologiesType = { name: string; logo: string; url: string };

const technologies = [
  {
    name: "Vite",
    logo: "i-logos:vitejs",
    url: "https://vitejs.dev/guide/why.html",
  },
  { name: "React", logo: "i-devicon:react", url: "https://reactjs.org/" },
  {
    name: "TypeScript",
    logo: "i-logos:typescript-icon",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Wouter",
    logo: "i-wouter",
    url: "https://github.com/molefrog/Wouter",
  },
  { name: "daisyUI", logo: "i-daisyui", url: "https://daisyui.com/" },
  {
    name: "TailwindCSS",
    logo: "i-logos:tailwindcss-icon",
    url: "https://tailwindcss.com/docs/installation",
  },
  {
    name: "UnoCSS",
    logo: "i-vscode-icons:file-type-unocss",
    url: "https://unocss.dev/",
  },
  {
    name: "Iconify",
    logo: "i-line-md:iconify2",
    url: "https://iconify.design/",
  },
  // { name: 'Jotai', logo: 'i-jotai', url: 'https://jotai.org/' },
];

const techDiv = (tech: TechnologiesType) => (
  <div
    key={tech.name}
    className="logo min-w-100px min-h-100px max-w-148px max-h-148px w-10vw h-10vw aspect-square m-2"
  >
    <div className="flex flex-col h-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square h-full flex items-center justify-center">
            <span className={`${tech.logo} w-full h-full object-contain`} />
          </div>
        </div>
      </div>
      <div className="text-lg text-center mt-2">
        {tech.name}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <Centered>
      <div className="grid grid-cols-[repeat(4,minmax(100px,1fr))]">
        {technologies.map((tech) => techDiv(tech))}
      </div>
    </Centered>
  );
}
