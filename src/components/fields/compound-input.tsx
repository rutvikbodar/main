"use client";

import { CompoundField } from "@/config/questionnaire";

type CompoundInputProps = {
  label: string;
  questionId: string;
  fields: CompoundField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  error?: string;
};

export default function CompoundInput({
  label,
  questionId,
  fields,
  values,
  onChange,
  error,
}: CompoundInputProps) {
  return (
    <div className="space-y-2.5">
      <span className="block text-sm font-medium text-bark">{label}</span>
      <div className="flex gap-4">
        {fields.map((field) => {
          const key = `${questionId}_${field.name}`;
          return (
            <div key={field.name} className="flex-1 space-y-1">
              <label
                htmlFor={key}
                className="block text-xs font-medium text-bark/60"
              >
                {field.label}
              </label>
              {field.type === "number" ? (
                <input
                  id={key}
                  type="number"
                  min={field.min}
                  max={field.max}
                  value={values[key] || ""}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-full rounded-xl border border-sage-200 bg-white/80 px-4 py-3 text-bark shadow-sm transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
                />
              ) : (
                <select
                  id={key}
                  value={values[key] || ""}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-full rounded-xl border border-sage-200 bg-white/80 px-4 py-3 text-bark shadow-sm transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
                >
                  <option value="">Select</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </div>
  );
}
