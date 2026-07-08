import SubmissionForm from "@/components/SubmissionForm";

export default function ContributePage() {
  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Contribute a Review</h1>
      <p className="text-gray-600 mb-8">
        Fill this out and it'll appear on the site once approved — no need to
        message anyone directly.
      </p>
      <SubmissionForm />
    </div>
  );
}