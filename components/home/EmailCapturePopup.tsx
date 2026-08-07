"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, X, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ebkan-newsletter-popup-seen";
const SHOW_DELAY_MS = 1200;
const AUTO_CLOSE_MS = 2200;

type Status = "idle" | "success";

export default function EmailCapturePopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    // Uncomment to only show this once per visitor:
    // if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    // Uncomment to remember the dismissal and stop showing this again:
    // localStorage.setItem(STORAGE_KEY, "1");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");

    // TODO: replace with a real API call — e.g. POST to your CRM,
    // Mailchimp/HubSpot, or a backend endpoint.
    console.log("Newsletter signup:", email);

    setStatus("success");
    // Uncomment alongside the checks above to remember this visitor opted in:
    // localStorage.setItem(STORAGE_KEY, "1");

    window.setTimeout(() => {
      setOpen(false);
    }, AUTO_CLOSE_MS);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            className="relative w-full max-w-md border border-ink-3 bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-accent)_0%,var(--color-teal)_100%)]"
              aria-hidden="true"
            />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-5 flex size-8 items-center justify-center text-white/50 transition-colors hover:text-teal"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <span className="flex size-14 items-center justify-center bg-accent/10 text-accent">
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">You're in</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                  Watch your inbox for AI-driven IT insights and product
                  updates from Ebkan Tech.
                </p>
              </div>
            ) : (
              <div className="px-8 py-10">
                <span className="flex size-12 items-center justify-center bg-accent/10 text-accent">
                  <Mail className="size-6" aria-hidden="true" />
                </span>
                <h3
                  id="newsletter-popup-title"
                  className="mt-5 font-display text-xl font-bold text-white text-balance sm:text-2xl"
                >
                  Get AI-driven IT insights, monthly
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                  Practical takes on AI, DevOps, and enterprise systems —
                  straight from our engineering team. No spam, unsubscribe
                  anytime.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="popup-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    required
                    autoFocus
                    placeholder="you@company.com"
                    className="w-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border border-accent bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink hover:border-white"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
