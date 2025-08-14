import React from "react";

function Role() {
  return (
    <>
      <section className="py-16 bg-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Don't See Your Role?</h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for talented people. Send us your resume and
            we'll keep you in mind for future opportunities.
          </p>
          <a
            // onClick={showPopup()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            Send Resume
          </a>
        </div>
      </section>
    </>
  );
}

export default Role;
