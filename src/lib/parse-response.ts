import { Question, CompoundQuestion } from "@/config/questionnaire";

export function parseAnswer(
  question: Question,
  raw: Record<string, string | string[]>
): string | null {
  const value = raw[question.id];

  switch (question.type) {
    case "radio":
    case "select": {
      if (typeof value === "string" && value.length > 0) return value;
      return null;
    }

    case "checkbox": {
      if (Array.isArray(value) && value.length > 0) return value.join(", ");
      return null;
    }

    case "compound": {
      return parseCompound(question, raw);
    }
  }
}

function parseCompound(
  question: CompoundQuestion,
  raw: Record<string, string | string[]>
): string | null {
  let result = question.format;
  let hasValue = false;

  for (const field of question.fields) {
    const key = `${question.id}_${field.name}`;
    const val = raw[key];
    if (typeof val === "string" && val.length > 0) {
      result = result.replace(`{${field.name}}`, val);
      hasValue = true;
    } else {
      result = result.replace(`{${field.name}}`, "0");
    }
  }

  return hasValue ? result : null;
}
