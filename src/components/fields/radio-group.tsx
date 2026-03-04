"use client";

type RadioGroupProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="block text-sm font-medium text-bark">{label}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
              value === opt
                ? "border-sage-500 bg-sage-50"
                : "border-sage-200 bg-white/80 hover:border-sage-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border-sage-300 text-sage-600 focus:ring-sage-500"
            />
            <span className="text-sm text-bark">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </fieldset>
  );
}
