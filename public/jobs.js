// Firebase Configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvHGJ9pucHkEVEpNMh5ij_IRQTdWUf280",
  authDomain: "devsphere-ed8da.firebaseapp.com",
  projectId: "devsphere-ed8da",
  storageBucket: "devsphere-ed8da.firebasestorage.app",
  messagingSenderId: "356519587631",
  appId: "1:356519587631:web:14e63cc011b59df456fbda",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const noJobsEl = document.getElementById("no-jobs");
const jobsContainer = document.getElementById("jobs-container");

// Function to create job card HTML
function createJobCard(job) {
  // Parse keywords if they're stored as a string
  let keywords = [];
  if (job.job_keywords) {
    if (typeof job.job_keywords === "string") {
      keywords = job.job_keywords.split(",").map((k) => k.trim());
    } else if (Array.isArray(job.job_keywords)) {
      keywords = job.job_keywords;
    }
  }

  // Create keywords HTML
  const keywordsHtml = keywords
    .map(
      (keyword) =>
        `<span class="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">${keyword}</span>`
    )
    .join("");

  return `
                <div class="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-indigo-500 transition-colors">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold text-white mb-2">
                                ${job.job_name || "Position Title"}
                            </h3>
                            <p class="text-gray-400">
                                ${job.job_domain || "Department"} • ${
    job.position_type || "Location"
  }
                            </p>
                        </div>
                        <span class="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                            ${job.job_type || "Full-time"}
                        </span>
                    </div>
                    <p class="text-gray-300 mb-4">
                        ${job.Job_description || "No description available."}
                    </p>
                    ${
                      keywords.length > 0
                        ? `
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${keywordsHtml}
                        </div>
                    `
                        : ""
                    }
                    <a onclick="showPopup()" 
                        class="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                    >
                        Apply Now    
                    </a>
                </div>
            `;
}

// Function to show different states
function showState(state) {
  loadingEl.classList.add("hidden");
  errorEl.classList.add("hidden");
  noJobsEl.classList.add("hidden");
  jobsContainer.classList.add("hidden");

  document.getElementById(state).classList.remove("hidden");
}

// Function to load jobs from Firebase
async function loadJobs() {
  try {
    showState("loading");

    // Fetch jobs from Firebase
    const jobsSnapshot = await db.collection("Jobs").get();

    if (jobsSnapshot.empty) {
      showState("no-jobs");
      return;
    }

    // Process jobs data
    const jobs = [];
    jobsSnapshot.forEach((doc) => {
      jobs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Create job cards HTML
    const jobCardsHtml = jobs.map((job) => createJobCard(job)).join("");
    jobsContainer.innerHTML = jobCardsHtml;

    showState("jobs-container");
  } catch (error) {
    console.error("Error loading jobs:", error);
    showState("error");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadJobs();
});
