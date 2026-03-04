"use client";

export default function SuccessScreen() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
        <svg
          className="h-10 w-10 text-sage-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-bark">
        Consultation Submitted
      </h2>
      <p className="max-w-sm text-bark/60">
        Thank you for completing your intake form. Our team will review your
        information and reach out to you shortly.
      </p>
    </div>
  );
}
