export type Condition = {
  questionId: string;
  equals: string;
};

export type BaseQuestion = {
  id: string;
  label: string;
  required?: boolean;
  condition?: Condition;
};

export type RadioQuestion = BaseQuestion & {
  type: "radio";
  options: string[];
};

export type SelectQuestion = BaseQuestion & {
  type: "select";
  options: string[];
};

export type CheckboxQuestion = BaseQuestion & {
  type: "checkbox";
  options: string[];
};

export type CompoundField = {
  name: string;
  label: string;
  type: "number" | "select";
  options?: string[];
  min?: number;
  max?: number;
};

export type CompoundQuestion = BaseQuestion & {
  type: "compound";
  fields: CompoundField[];
  format: string;
};

export type Question =
  | RadioQuestion
  | SelectQuestion
  | CheckboxQuestion
  | CompoundQuestion;

export const questions: Question[] = [
  {
    id: "gender",
    label: "What is your biological sex?",
    type: "radio",
    required: true,
    options: ["Male", "Female"],
  },
  {
    id: "pregnant",
    label: "Are you currently pregnant?",
    type: "radio",
    required: true,
    options: ["Yes", "No"],
    condition: { questionId: "gender", equals: "Female" },
  },
  {
    id: "trimester",
    label: "Which trimester are you in?",
    type: "select",
    required: true,
    options: ["First trimester", "Second trimester", "Third trimester"],
    condition: { questionId: "pregnant", equals: "Yes" },
  },
  {
    id: "conditions",
    label: "Do you have any of the following conditions?",
    type: "checkbox",
    required: false,
    options: [
      "Diabetes",
      "Hypertension",
      "Heart Disease",
      "Asthma",
      "Thyroid Disorder",
      "None of the above",
    ],
  },
  {
    id: "height",
    label: "What is your height?",
    type: "compound",
    required: true,
    fields: [
      { name: "feet", label: "Feet", type: "number", min: 1, max: 8 },
      { name: "inches", label: "Inches", type: "number", min: 0, max: 11 },
    ],
    format: "{feet} feet {inches} inches",
  },
  {
    id: "weight",
    label: "What is your approximate weight (lbs)?",
    type: "select",
    required: true,
    options: [
      "Under 100",
      "100–150",
      "151–200",
      "201–250",
      "251–300",
      "Over 300",
    ],
  },
  {
    id: "smoking",
    label: "Do you currently smoke?",
    type: "radio",
    required: true,
    options: ["Yes", "No", "Former smoker"],
  },
  {
    id: "allergies",
    label: "Do you have any known allergies?",
    type: "radio",
    required: true,
    options: ["Yes", "No"],
  },
  {
    id: "medications",
    label: "Are you currently taking any medications?",
    type: "radio",
    required: true,
    options: ["Yes", "No"],
  },
  {
    id: "exercise",
    label: "How often do you exercise per week?",
    type: "select",
    required: true,
    options: [
      "Never",
      "1–2 times",
      "3–4 times",
      "5+ times",
    ],
  },
];
