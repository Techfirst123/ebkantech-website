"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, products } from "@/lib/data";
import MegaMenu from "@/components/site/MegaMenu";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"services" | "products" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "products" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || activeMenu
          ? "bg-ink border-b border-ink-3"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div
        ref={navRef}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center bg-accent font-display text-sm font-bold text-ink">
            E
          </span>
          <span className="font-display text-base font-semibold uppercase tracking-widest text-white">
            Ebkan<span className="text-teal">Tech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
              activeMenu === "services" ? "text-teal" : "text-white/85 hover:text-teal"
            )}
            onMouseEnter={() => setActiveMenu("services")}
            onClick={() => setActiveMenu((m) => (m === "services" ? null : "services"))}
            aria-expanded={activeMenu === "services"}
          >
            Services
            <ChevronDown
              className={cn("size-3.5 transition-transform", activeMenu === "services" && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors",
              activeMenu === "products" ? "text-teal" : "text-white/85 hover:text-teal"
            )}
            onMouseEnter={() => setActiveMenu("products")}
            onClick={() => setActiveMenu((m) => (m === "products" ? null : "products"))}
            aria-expanded={activeMenu === "products"}
          >
            Products
            <ChevronDown
              className={cn("size-3.5 transition-transform", activeMenu === "products" && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/85 transition-colors hover:text-teal"
              onMouseEnter={() => setActiveMenu(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="onDark" className="px-5 py-2.5">
            Get a Quote
          </Button>
          <Button href="/contact" variant="primary" className="px-5 py-2.5">
            Book a Demo
          </Button>
        </div>

        <button
          className="flex size-10 items-center justify-center text-white lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>

        <div className="hidden lg:contents">
          <MegaMenu
            basePath="/services"
            items={services.map((s) => ({ slug: s.slug, name: s.name, short: s.short, icon: s.icon }))}
            overviewHref="/services"
            overviewLabel="View all services"
            highlight={{
              title: "AI Chat Assistants, embedded everywhere",
              description:
                "Every service we deliver can be paired with an embedded AI assistant that automates support, reporting, and internal workflows.",
              href: "/services/ai-chatbot-virtual-assistant",
              label: "Explore AI assistants",
            }}
            open={activeMenu === "services"}
          />
          <MegaMenu
            basePath="/products"
            items={products.map((p) => ({ slug: p.slug, name: p.name, short: p.short, icon: p.icon }))}
            overviewHref="/products"
            overviewLabel="View all products"
            highlight={{
              title: "Predictive analytics, built in",
              description:
                "Every Ebkan Tech product ships with predictive analytics and automated reporting powered by our in-house AI layer.",
              href: "/products/ai-add-ons",
              label: "See AI add-ons",
            }}
            open={activeMenu === "products"}
          />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-ink p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                  Menu
                </span>
                <button
                  className="flex size-10 items-center justify-center text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                <MobileSection
                  label="Services"
                  open={mobileSection === "services"}
                  onToggle={() => setMobileSection((s) => (s === "services" ? null : "services"))}
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-teal"
                    onClick={() => setMobileOpen(false)}
                  >
                    View all services →
                  </Link>
                </MobileSection>

                <MobileSection
                  label="Products"
                  open={mobileSection === "products"}
                  onToggle={() => setMobileSection((s) => (s === "products" ? null : "products"))}
                >
                  {products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="block px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {p.name}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-teal"
                    onClick={() => setMobileOpen(false)}
                  >
                    View all products →
                  </Link>
                </MobileSection>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-t border-white/10 px-3 py-4 text-xs font-medium uppercase tracking-widest text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/contact" variant="onDark" className="w-full">
                  Get a Quote
                </Button>
                <Button href="/contact" variant="primary" className="w-full">
                  Book a Demo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/10 py-1">
      <button
        className="flex w-full items-center justify-between px-3 py-3 text-xs font-medium uppercase tracking-widest text-white"
        onClick={onToggle}
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-2 pl-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
