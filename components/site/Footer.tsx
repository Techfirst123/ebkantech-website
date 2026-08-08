import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { services, products, industries } from "@/lib/data";
import { LinkedInIcon, XIcon, GitHubIcon } from "@/components/site/SocialIcons";
import NewsletterForm from "@/components/site/NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-ink-3 bg-ink text-white">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center bg-accent font-display text-sm font-bold text-ink">
                E
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-widest text-white">
                Ebkan<span className="text-teal">Tech</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              AI-driven IT services and enterprise products for teams that build,
              manage, and grow physical and digital operations.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-teal" aria-hidden="true" />
                sales@ebkantech.com
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-teal" aria-hidden="true" />
                +91 97178 15626
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-teal" aria-hidden="true" />
                Remote-first, global delivery
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Services</h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/60 hover:text-teal">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Products</h3>
            <ul className="mt-4 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-sm text-white/60 hover:text-teal">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/industries" className="text-sm text-white/60 hover:text-teal">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-teal">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-teal">
                  Contact
                </Link>
              </li>
              {industries.slice(0, 2).map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries#${i.slug}`} className="text-sm text-white/60 hover:text-teal">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <NewsletterForm />

          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-teal">
              <LinkedInIcon className="size-5" />
            </a>
            <a href="#" aria-label="X (Twitter)" className="text-white/50 hover:text-teal">
              <XIcon className="size-5" />
            </a>
            <a href="#" aria-label="GitHub" className="text-white/50 hover:text-teal">
              <GitHubIcon className="size-5" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Ebkan Tech. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
