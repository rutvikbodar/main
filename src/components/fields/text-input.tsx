"use client";

type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
};

export default function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-bark">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-bark placeholder-bark/40 shadow-sm transition-colors focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 ${
          error ? "border-terra-500" : "border-sage-200"
        }`}
      />
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </div>
  );
}
