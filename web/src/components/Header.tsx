import { useLocation } from "wouter";
import { Icon } from "@iconify/react";

export default function Header() {
  const [, setLocation] = useLocation();
  return (
    <div className="w-full navbar">
      <div className="navbar-start">
        <span className="text-4xl p-3 font-100 select-none tracking-widest uppercase">
          Neutralino<span className="text-xl">js</span>
        </span>
      </div>
      <div className="navbar-end p-3 gap-x-2">
        <button
          title="Home"
          className="btn btn-lg btn-ghost btn-square"
          onClick={() => setLocation("/")}
        >
          <Icon icon="si:home-detailed-fill" className="w-8 h-8" />
        </button>
        <button
          title="Info"
          className="btn btn-lg btn-ghost btn-square"
          onClick={() => setLocation("/info")}
        >
          <Icon icon="mynaui:info-hexagon-solid" className="w-8 h-8" />
        </button>
        <button
          title="Playground"
          className="btn btn-lg btn-ghost btn-square"
          onClick={() => setLocation("/playground")}
        >
          <Icon
            icon="game-icons:perspective-dice-six-faces-random"
            className="w-8 h-8"
          />
        </button>
        <button
          title="Settings"
          className="btn btn-lg btn-ghost btn-square"
          onClick={() => setLocation("/settings")}
        >
          <Icon
            icon="ion:md-options"
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
}
