"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { MoveRight } from "lucide-react";

export type MegaMenuItem = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
};

export default function MegaMenu({
  basePath,
  items,
  overviewHref,
  overviewLabel,
  highlight,
  open,
}: {
  basePath: string;
  items: MegaMenuItem[];
  overviewHref: string;
  overviewLabel: string;
  highlight: { title: string; description: string; href: string; label: string };
  open: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute inset-x-0 top-full z-40"
        >
          <div className="mx-auto mt-0 w-full max-w-5xl border border-ink-3 bg-white shadow-2xl shadow-black/20">
            <div className="grid grid-cols-3">
              <div className="col-span-2 grid grid-cols-2 gap-1 p-4">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={`${basePath}/${item.slug}`}
                      className="group flex items-start gap-3 p-3 transition-colors hover:bg-mist"
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold uppercase tracking-wide text-ink">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink/55">
                          {item.short}
                        </span>
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href={overviewHref}
                  className="col-span-2 mt-1 flex items-center justify-between border border-dashed border-accent/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-accent transition-colors hover:border-accent hover:bg-accent/5"
                >
                  {overviewLabel}
                  <MoveRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="flex flex-col justify-between bg-ink p-6">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">
                    AI-driven
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-white">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {highlight.description}
                  </p>
                </div>
                <Link
                  href={highlight.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal hover:text-white"
                >
                  <MoveRight className="size-3.5" aria-hidden="true" />
                  {highlight.label}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
