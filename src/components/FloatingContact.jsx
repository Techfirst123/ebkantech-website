import { Link } from "react-router-dom";
import { WHATSAPP } from "../data/contact";

/**
 * Always-visible contact shortcuts, on every page:
 *   - a "Get in touch" tab fixed to the left edge → the contact form
 *   - a WhatsApp button (bottom right), only once WHATSAPP.number is set
 * Styles: vibrant.css (.fct, .fwa).
 */
export default function FloatingContact() {
  const number = String(WHATSAPP.number || "").replace(/\D/g, "");
  const waHref = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP.message)}`
    : null;

  return (
    <>
      <Link to="/#contact" className="fct">
        Get in touch
      </Link>

      {waHref && (
        <a className="fwa" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 6.9 3.8zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
            />
          </svg>
        </a>
      )}
    </>
  );
}
