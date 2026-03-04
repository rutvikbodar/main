"use client";

import { useState } from "react";
import IntakeForm from "./intake-form";
import Questionnaire from "./questionnaire";
import SuccessScreen from "./success-screen";
import { IntakeData } from "@/schemas/consult";
import { questions } from "@/config/questionnaire";
import { parseAnswer } from "@/lib/parse-response";
import { getUserTimezone } from "@/lib/timezone";

type Step = "intake" | "questionnaire" | "success";

export default function ConsultWizard() {
  const [step, setStep] = useState<Step>("intake");
  const [intakeData, setIntakeData] = useState<IntakeData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleIntakeSubmit(data: IntakeData) {
    setIntakeData(data);
    setStep("questionnaire");
  }

  async function handleQuestionnaireSubmit(
    answers: Record<string, string | string[]>
  ) {
    setQuestionnaireAnswers(answers);
    setSubmitting(true);
    setSubmitError("");

    const responses: { questionId: string; answer: string }[] = [];
    for (const question of questions) {
      if (question.condition) {
        const dep = answers[question.condition.questionId];
        if (dep !== question.condition.equals) continue;
      }
      const parsed = parseAnswer(question, answers);
      if (parsed) {
        responses.push({ questionId: question.id, answer: parsed });
      }
    }

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...intakeData,
          timezone: getUserTimezone(),
          responses,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Submission failed");
      }

      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = step === "intake" ? 0 : step === "questionnaire" ? 1 : 2;

  return (
    <div className="mx-auto w-full max-w-lg">
      {step !== "success" && (
        <div className="mb-8 flex items-center gap-3">
          {["Your Details", "Questionnaire"].map((label, i) => (
            <div key={label} className="flex flex-1 flex-col gap-1.5">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= stepIndex ? "bg-sage-500" : "bg-sage-200"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  i <= stepIndex ? "text-sage-700" : "text-bark/40"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-sage-200 bg-cream/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        {step === "intake" && (
          <IntakeForm data={intakeData} onSubmit={handleIntakeSubmit} />
        )}

        {step === "questionnaire" && (
          <>
            <Questionnaire
              answers={questionnaireAnswers}
              onSubmit={handleQuestionnaireSubmit}
              onBack={() => setStep("intake")}
            />
            {submitting && (
              <div className="mt-4 text-center text-sm text-bark/60">
                Submitting your consultation...
              </div>
            )}
            {submitError && (
              <div className="mt-4 rounded-xl border border-terra-200 bg-terra-50 p-3 text-center text-sm text-terra-600">
                {submitError}
              </div>
            )}
          </>
        )}

        {step === "success" && <SuccessScreen />}
      </div>
    </div>
  );
}
