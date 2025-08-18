// components/Positions.tsx
"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { atomPopup } from "@/app/utils/appsAtom";
import { useAtom } from "jotai";
import ContactPopup from "./ContactPopup";
interface Job {
  id: string;
  job_name: string;
  job_domain: string;
  position_type: string;
  job_type: string;
  Job_description: string;
  job_keywords?: string[] | string;
}

export default function Positions() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showPopup, setShowPopup] = useAtom(atomPopup);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await db.collection("Jobs").get();
        if (snapshot.empty) {
          setJobs([]);
        } else {
          const jobsData: Job[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Job[];
          setJobs(jobsData);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section id="job" className="py-16 bg-black">
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading positions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="job" className="py-16 bg-black">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">Failed to load positions</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section id="job" className="py-16 bg-black">
        <h1 className="text-4xl text-gray-600 font-bold text-center">
          Sorry! No Positions Available
        </h1>
      </section>
    );
  }

  return (
    <>
      <section id="job" className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => {
              let keywords: string[] = [];
              if (typeof job.job_keywords === "string") {
                keywords = job.job_keywords.split(",").map((k) => k.trim());
              } else if (Array.isArray(job.job_keywords)) {
                keywords = job.job_keywords;
              }

              return (
                <div
                  key={job.id}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {job.job_name || "Position Title"}
                      </h3>
                      <p className="text-gray-400">
                        {job.job_domain || "Department"} •{" "}
                        {job.position_type || "Location"}
                      </p>
                    </div>
                    <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                      {job.job_type || "Full-time"}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {job.Job_description || "No description available."}
                  </p>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setShowPopup(true)} // ✅ fixed empty onClick
                    className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <ContactPopup />
    </>
  );
}
