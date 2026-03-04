"use client";

import { useState } from "react";
import { intakeSchema, IntakeData } from "@/schemas/consult";
import TextInput from "./fields/text-input";
import DateInput from "./fields/date-input";

type IntakeFormProps = {
  data: IntakeData;
  onSubmit: (data: IntakeData) => void;
};

export default function IntakeForm({ data, onSubmit }: IntakeFormProps) {
  const [form, setForm] = useState<IntakeData>(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = intakeSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  }

  function update(field: keyof IntakeData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-bark">Your Details</h2>
        <p className="text-sm text-bark/60">
          Please provide your basic information to get started.
        </p>
      </div>

      <TextInput
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={(v) => update("fullName", v)}
        error={errors.fullName}
        placeholder="Jane Doe"
      />

      <TextInput
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        error={errors.email}
        placeholder="jane@example.com"
      />

      <TextInput
        label="Phone Number"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={(v) => update("phone", v)}
        error={errors.phone}
        placeholder="(555) 123-4567"
      />

      <DateInput
        label="Date of Birth"
        name="dateOfBirth"
        value={form.dateOfBirth}
        onChange={(v) => update("dateOfBirth", v)}
        error={errors.dateOfBirth}
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-sage-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
      >
        Continue
      </button>
    </form>
  );
}
