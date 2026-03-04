"use client";

type CheckboxGroupProps = {
  label: string;
  name: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

export default function CheckboxGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: CheckboxGroupProps) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  }

  return (
    <fieldset className="space-y-2.5">
      <legend className="block text-sm font-medium text-bark">{label}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
              value.includes(opt)
                ? "border-sage-500 bg-sage-50"
                : "border-sage-200 bg-white/80 hover:border-sage-300"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 rounded border-sage-300 text-sage-600 focus:ring-sage-500"
            />
            <span className="text-sm text-bark">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-terra-500">{error}</p>}
    </fieldset>
  );
}
