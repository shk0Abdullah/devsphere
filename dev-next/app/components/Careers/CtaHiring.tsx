import React from "react";

function CtaHiring() {
  return (
    <>
      <section className="text-center py-40 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            We're <span className="text-indigo-400">Hiring!</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Join our amazing team and help us build the future of technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#job"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default CtaHiring;
