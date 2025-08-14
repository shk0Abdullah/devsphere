"use client";
import React from "react";
import Image from "next/image";
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/devspherelt",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        viewBox="0 0 256 256"
        className="fill-white opacity-70 hover:opacity-100 transition-opacity"
      >
        <path d="M41,4h-32c-2.76,0-5,2.24-5,5v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5v-32c0-2.76-2.24-5-5-5zM17,20v19h-6v-19zM11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53s-3-1.13-3-2.53zM39,39h-6c0,0,0-9.26,0-10,0-2-1-4-3.5-4.04h-0.08c-2.42,0-3.42,2.06-3.42,4.04,0,0.91,0,10,0,10h-6v-19h6v2.56c0,0,1.93-2.56,5.81-2.56c3.97,0,7.19,2.73,7.19,8.26z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/devspherelt?igsh=MTA4MXZndzBzMW40ag==",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 256 256"
        className="fill-white opacity-70 hover:opacity-100 transition-opacity"
      >
        <path d="M8,3c-2.757,0-5,2.243-5,5v8c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5v-8c0-2.757-2.243-5-5-5zM8,5h8c1.654,0,3,1.346,3,3v8c0,1.654-1.346,3-3,3h-8c-1.654,0-3-1.346-3-3v-8c0-1.654,1.346-3,3-3zM17,6c-0.55228,0-1,0.44772-1,1,0,0.55228,0.44772,1,1,1,0.55228,0,1-0.44772,1-1,0-0.55228-0.44772-1-1-1zM12,7c-2.757,0-5,2.243-5,5,0,2.757,2.243,5,5,5,2.757,0,5-2.243,5-5,0-2.757-2.243-5-5-5zM12,9c1.654,0,3,1.346,3,3,0,1.654-1.346,3-3,3-1.654,0-3-1.346-3-3,0-1.654,1.346-3,3-3z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/devspherelt/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="fill-white opacity-70 hover:opacity-100 transition-opacity"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-black text-neutral-content p-10">
      <aside>
        <Image
          src="/new.png"
          alt="DevSphere Logo"
          className="h-13 w-auto md:h-[5.5rem] lg:h-[6.5rem]"
          width={0} // let intrinsic width drive the ratio
          height={0}
          style={{ height: "auto" }} // keeps aspect ratio
          unoptimized // optional: skip Next.js image opt for static PNG
        />
        <p className="text-white">
          DevSphere Ltd.
          <br />
          Providing reliable tech Solutions
          <br />
          Contact: info@devsphereltd.com
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              {link.svg}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}
