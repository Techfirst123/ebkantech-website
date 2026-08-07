"use client";

export default function NewsletterForm() {
  return (
    <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Subscribe to product updates"
        className="w-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 border border-accent bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-ink hover:border-ink-3"
      >
        Subscribe
      </button>
    </form>
  );
}
