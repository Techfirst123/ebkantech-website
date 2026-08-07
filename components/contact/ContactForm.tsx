"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

const INTERESTS = [
  "Web Development",
  "DevOps & Cloud Engineering",
  "Data Analytics & BI Reporting",
  "Machine Learning & AI Solutions",
  "AI Chatbot / Virtual Assistant",
  "ERP for Construction & EPC",
  "CRM for Vendor & Site Management",
  "Something else",
];

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center border border-ink/10 bg-mist p-10 text-center">
        <span className="flex size-14 items-center justify-center bg-accent/10 text-accent">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
          Thanks for reaching out — a member of our team will get back to you
          within one business day.
        </p>
      </div>
    );
  }

  const fieldClasses =
    "w-full border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-3 focus:ring-accent/15";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-ink/10 p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClasses}
          />
        </Field>
        <Field label="Work email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClasses}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" type="text" className={fieldClasses} />
        </Field>
        <Field label="I'm interested in" htmlFor="interest">
          <select id="interest" name="interest" className={fieldClasses} defaultValue={INTERESTS[0]}>
            {INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClasses} resize-none`}
          placeholder="Tell us a bit about your project or challenge..."
        />
      </Field>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending...
          </span>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/70">
        {label}
      </label>
      {children}
    </div>
  );
}
