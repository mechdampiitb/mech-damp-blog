"use client";
import { useState } from "react";
import SubmissionForm from "@/components/SubmissionForm";
import ExperienceSubmissionForm from "@/components/ExperienceSubmissionForm";

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState<"courses" | "experiences">("courses");

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 tracking-tight text-gray-900">Contribute a Review</h1>
      <p className="text-gray-600 mb-8">
        Fill this out and your review will appear on the site once approved by the DAMP team — helping fellow IITB Mech students make informed decisions.
      </p>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-8 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("courses")}
          className={`pb-3 font-medium text-base relative transition-colors cursor-pointer ${
            activeTab === "courses"
              ? "text-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Courses Review
          {activeTab === "courses" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full transition-all" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experiences")}
          className={`pb-3 font-medium text-base relative transition-colors cursor-pointer ${
            activeTab === "experiences"
              ? "text-blue-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Experiences & Internships Review
          {activeTab === "experiences" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full transition-all" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="transition-opacity duration-300">
        {activeTab === "courses" ? (
          <div>
            <div className="mb-6 bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Course Review</h2>
              <p className="text-sm text-gray-600">
                Share insights about grading rigor, professor effectiveness, lecture attendance policies, and workload.
              </p>
            </div>
            <SubmissionForm />
          </div>
        ) : (
          <div>
            <div className="mb-6 bg-purple-50/50 border border-purple-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Internship / Core Experience Review</h2>
              <p className="text-sm text-gray-600">
                Provide details about selection rounds, interview preparation, work culture, and key takeaways for juniors.
              </p>
            </div>
            <ExperienceSubmissionForm />
          </div>
        )}
      </div>
    </div>
  );
}