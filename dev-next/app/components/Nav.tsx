"use client";
import "../globals.css";
import { useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((o) => !o);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <div className="relative h-14 md:h-22 lg:h-20 w-36 md:w-44 lg:w-48">
          <Image
            src="/devsphere.png"
            alt="DevSphere logo"
            fill
            className="object-contain"
            priority
            sizes="1000px"
          />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-gray-300">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="/#impact" className="hover:text-white transition-colors">
            Impact
          </a>
          <a href="/#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="/#whoweare" className="hover:text-white transition-colors">
            Who we are
          </a>
          <a href="/#whatwedo" className="hover:text-white transition-colors">
            What we do
          </a>
          <a href="/jobs" className="hover:text-white transition-colors">
            Careers
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300
              ${isMenuOpen ? "rotate-45 translate-x-1 translate-y-1" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300
              ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300
              ${isMenuOpen ? "-rotate-45 translate-x-1 -translate-y-1" : ""}`}
          />
        </button>

        {/* Desktop CTA */}
        <button className="hidden md:block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors text-sm md:text-base">
          Let's Talk
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-10 bg-black/95 flex flex-col items-center justify-center h-full space-y-8 text-white text-xl transition-transform duration-300 md:hidden
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <a href="/" onClick={closeMenu} className="hover:text-indigo-400">
          Home
        </a>
        <a
          href="/#impact"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Impact
        </a>
        <a
          href="/#services"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Services
        </a>
        <a
          href="/#whoweare"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Who we are
        </a>
        <a
          href="/#whatwedo"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          What we do
        </a>
        <a href="/jobs" onClick={closeMenu} className="hover:text-indigo-400">
          Careers
        </a>

        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full">
          Let's Talk
        </button>
      </div>
    </>
  );
}
