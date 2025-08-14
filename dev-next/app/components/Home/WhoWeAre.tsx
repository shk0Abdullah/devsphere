"use client";
import React from "react";

function WhoWeAre() {
  return (
    <>
      <section id="whoweare">
        <section className="text-gray-400 body-font bg-black">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">
                Who we Are
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                The Team Behind Intelligent Solutions
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Where we craft ideas into execution, DevSphere stands as a hub
                of innovation and purpose. We blend creative thinking with
                cutting-edge tech to build solutions that matter. With every
                project, we turn raw concepts into polished realities—driven by
                vision, built for impact.
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
                <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                  Smart Strategy
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  We align technology with your business goals to create
                  solutions that are not just functional but future-ready.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
                <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                  AI-Driven Development
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Leveraging AI and automation, we build intelligent systems
                  that simplify complexity and power innovation.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
                <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                  Scalable Web Apps
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  Our team delivers clean, responsive, and scalable applications
                  tailored to your workflow and customer needs.
                </p>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-800">
                <h2 className="text-lg sm:text-xl text-white font-medium title-font mb-2">
                  Collaborative Process
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  From ideation to delivery, we work closely with you to ensure
                  the product reflects your vision and exceeds expectations.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg transition-colors duration-300"
            >
              Know more!
            </button>
          </div>
        </section>
      </section>
      <hr></hr>
    </>
  );
}

export default WhoWeAre;
