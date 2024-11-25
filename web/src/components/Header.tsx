import { Link } from "wouter";

export default function Header() {
  return (
    <div className="w-full navbar">
      <div className="navbar-start">
        <span className="text-4xl p-3 font-100 select-none tracking-widest uppercase">
          Neutralino<span className="text-xl">js</span>
        </span>
      </div>
      <div className="navbar-end gap-x-2">
        <Link className="btn btn-lg btn-ghost" href="/">
          Home
        </Link>
        <Link className="btn btn-lg btn-ghost" href="/info">
          Info
        </Link>
        <Link className="btn btn-lg btn-ghost" href="/playground">
          Playground
        </Link>
        {/* <Link className="btn btn-lg btn-ghost" href="/something">
          404
        </Link> */}
      </div>
    </div>
  );
}
