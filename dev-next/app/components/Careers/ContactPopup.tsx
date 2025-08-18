"use client";
import React from "react";
import { useAtom } from "jotai";
import { atomPopup } from "@/app/utils/appsAtom";
export default function ContactPopup() {
  const [showPopup, setShowPopup] = useAtom(atomPopup);
  return (
    showPopup && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowPopup(false)}
      >
        {/* Popup Content */}
        <div
          className="bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 hover:scale-100"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Header */}
          <div className="text-center mb-6">
            <svg
              className="mx-auto mb-4 text-zinc-400 w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Apply?
            </h3>
            <p className="text-zinc-300 font-medium">
              Join our team and make an impact
            </p>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <p className="text-white text-lg mb-4 font-bold">
              <strong className="text-blue-400">Apply now at:</strong>
            </p>
            <div className="bg-zinc-700 rounded-lg p-4 border border-zinc-600">
              <a
                href="mailto:info@devsphereltd.com"
                className="text-blue-400 hover:text-blue-300 font-bold text-lg transition-colors"
              >
                info@devsphereltd.com
              </a>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
