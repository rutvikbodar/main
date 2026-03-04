"use client";

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-bark">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-bark shadow-sm transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 ${
          error ? "border-terra-500" : "border-sage-200"
        }`}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </div>
  );
}
