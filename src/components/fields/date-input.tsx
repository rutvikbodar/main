"use client";

type DateInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function DateInput({
  label,
  name,
  value,
  onChange,
  error,
}: DateInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-bark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-bark shadow-sm transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 ${
          error ? "border-terra-500" : "border-sage-200"
        }`}
      />
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </div>
  );
}
