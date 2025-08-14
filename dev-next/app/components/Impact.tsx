import React from "react";

function Impact() {
  return (
    <>
      <section id="impact" className="text-gray-400 bg-black body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mt-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Our Impact
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-10">
              We're bridging innovation and impact—driving smarter decisions and
              scalable growth across industries.
              <br />
              DevSphere is redefining how businesses harness technology by
              delivering AI-powered solutions that solve real-world problems.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="border-2 border-gray-800 px-6 py-8 rounded-lg text-center hover:border-indigo-500 transition-colors duration-300">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-indigo-400 w-12 h-12 mb-4 mx-auto"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-bold text-4xl text-white mb-2">
                50+
              </h2>
              <p className="leading-relaxed text-gray-300 font-medium">
                Projects
              </p>
            </div>

            <div className="border-2 border-gray-800 px-6 py-8 rounded-lg text-center hover:border-indigo-500 transition-colors duration-300">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-indigo-400 w-12 h-12 mb-4 mx-auto"
                viewBox="0 0 24 24"
              >
                <path d="M8 17l4 4 4-4m-4-5v9"></path>
                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
              </svg>
              <h2 className="title-font font-bold text-4xl text-white mb-2">
                100+
              </h2>
              <p className="leading-relaxed text-gray-300 font-medium">
                Deployed Websites
              </p>
            </div>

            <div className="border-2 border-gray-800 px-6 py-8 rounded-lg text-center hover:border-indigo-500 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-indigo-400 w-12 h-12 mb-4 mx-auto"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h2 className="title-font font-bold text-4xl text-white mb-2">
                10+
              </h2>
              <p className="leading-relaxed text-gray-300 font-medium">
                B2B Collaborations
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Impact;
