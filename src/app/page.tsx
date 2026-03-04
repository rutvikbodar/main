import ConsultWizard from "@/components/consult-wizard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 sm:py-20">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-bark sm:text-4xl">
          Intake Consultation
        </h1>
        <p className="mt-2 text-bark/60">
          Please complete the form below to schedule your consultation.
        </p>
      </div>
      <ConsultWizard />
    </main>
  );
}
