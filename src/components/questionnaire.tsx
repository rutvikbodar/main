"use client";

import { useState } from "react";
import { questions, Question } from "@/config/questionnaire";
import RadioGroup from "./fields/radio-group";
import SelectField from "./fields/select-field";
import CheckboxGroup from "./fields/checkbox-group";
import CompoundInput from "./fields/compound-input";

type QuestionnaireProps = {
  answers: Record<string, string | string[]>;
  onSubmit: (answers: Record<string, string | string[]>) => void;
  onBack: () => void;
};

function isVisible(
  question: Question,
  answers: Record<string, string | string[]>
): boolean {
  if (!question.condition) return true;
  const dep = answers[question.condition.questionId];
  return dep === question.condition.equals;
}

export default function Questionnaire({
  answers: initialAnswers,
  onSubmit,
  onBack,
}: QuestionnaireProps) {
  const [answers, setAnswers] =
    useState<Record<string, string | string[]>>(initialAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    for (const q of questions) {
      if (!isVisible(q, answers)) continue;
      if (!q.required) continue;

      if (q.type === "compound") {
        const hasAll = q.fields.every((f) => {
          const key = `${q.id}_${f.name}`;
          const val = answers[key];
          return typeof val === "string" && val.length > 0;
        });
        if (!hasAll) newErrors[q.id] = "Please fill in all fields";
      } else {
        const val = answers[q.id];
        if (!val || (Array.isArray(val) && val.length === 0) || val === "") {
          newErrors[q.id] = "This field is required";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(answers);
  }

  function renderQuestion(question: Question) {
    if (!isVisible(question, answers)) return null;

    switch (question.type) {
      case "radio":
        return (
          <RadioGroup
            key={question.id}
            label={question.label}
            name={question.id}
            options={question.options}
            value={(answers[question.id] as string) || ""}
            onChange={(v) => setAnswer(question.id, v)}
            error={errors[question.id]}
          />
        );

      case "select":
        return (
          <SelectField
            key={question.id}
            label={question.label}
            name={question.id}
            options={question.options}
            value={(answers[question.id] as string) || ""}
            onChange={(v) => setAnswer(question.id, v)}
            error={errors[question.id]}
          />
        );

      case "checkbox":
        return (
          <CheckboxGroup
            key={question.id}
            label={question.label}
            name={question.id}
            options={question.options}
            value={(answers[question.id] as string[]) || []}
            onChange={(v) => setAnswer(question.id, v)}
            error={errors[question.id]}
          />
        );

      case "compound":
        return (
          <CompoundInput
            key={question.id}
            label={question.label}
            questionId={question.id}
            fields={question.fields}
            values={
              Object.fromEntries(
                Object.entries(answers).filter(
                  ([k, v]) => k.startsWith(`${question.id}_`) && typeof v === "string"
                )
              ) as Record<string, string>
            }
            onChange={(key, value) => setAnswer(key, value)}
            error={errors[question.id]}
          />
        );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-bark">
          Health Questionnaire
        </h2>
        <p className="text-sm text-bark/60">
          Help us understand your health background.
        </p>
      </div>

      {questions.map(renderQuestion)}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-sage-300 px-6 py-3.5 text-sm font-semibold text-bark transition-colors hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-sage-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
