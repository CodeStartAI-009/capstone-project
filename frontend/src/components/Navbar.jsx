import { Link, NavLink } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  ["Home", "/"],
  ["Detect", "/detect"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-200/40 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-wide text-slate-800">
              Sentinel
              <span className="text-blue-600">URL</span>
            </h1>
            <p className="-mt-1 text-xs text-slate-500">
              Phishing Detection System
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Link
            to="/detect"
            className="hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:inline-flex"
          >
            Analyze URL
          </Link>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}