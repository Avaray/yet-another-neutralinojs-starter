import { useLocation } from "wouter";
import { ThemesDrawer } from "./ThemeSwitcher";

export default function Header() {
  const [, setLocation] = useLocation();
  return (
    <div className="w-full navbar">
      <div className="navbar-start">
        <span className="text-4xl p-3 font-100 select-none tracking-widest uppercase">
          Neutralino<span className="text-xl">js</span>
        </span>
      </div>
      <div className="navbar-end gap-x-2">
        <button
          className="btn btn-lg btn-ghost"
          onClick={() => setLocation("/")}
        >
          Home
        </button>
        <ThemesDrawer />
        <button
          className="btn btn-lg btn-ghost"
          onClick={() => setLocation("/info")}
        >
          Info
        </button>
        <button
          className="btn btn-lg btn-ghost"
          onClick={() => setLocation("/playground")}
        >
          Playground
        </button>
      </div>
    </div>
  );
}
