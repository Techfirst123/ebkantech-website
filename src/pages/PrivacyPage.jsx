import { useEffect } from "react";
import TopBar from "../components/TopBar";
import SiteFooter from "../components/SiteFooter";
import { SITE } from "../data/site";

/**
 * /privacy — a plain privacy notice describing what this website actually
 * does with visitor data. Review it with your legal adviser before relying on
 * it, and update it if you add analytics, chat widgets or cookies.
 */
export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopBar />
      <main className="cp">
        <div className="wrap legal-page">
          <p className="eyebrow">Legal</p>
          <h1 className="cp-title">Privacy policy</h1>
          <p className="legal-updated mono">Last updated: October 2026</p>

          <h2>Who we are</h2>
          <p>
            This website is run by {SITE.name} (“Ebkan Tech”, “we”). You can reach us at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {SITE.phone ? ` or ${SITE.phone}` : ""}.
          </p>

          <h2>What we collect</h2>
          <p>
            When you send an enquiry through the contact form, we receive the details you enter: your
            name, company, work email, the product or service you are interested in, and your message.
            If you contact us on WhatsApp, by email or by phone, we receive what you send us there.
          </p>
          <p>
            Like any website, our hosting provider records standard technical information (such as IP
            address, browser type and pages requested) to keep the site secure and running.
          </p>

          <h2>How we use it</h2>
          <p>
            We use your enquiry details only to reply to you, arrange demos, and send the information
            you asked for. We do not sell your information, and we do not add you to marketing lists
            without your consent.
          </p>

          <h2>Product demos and client data</h2>
          <p>
            If you share project files with us for a demo (for example a BOQ or vendor list), we use
            them only to prepare that demo and delete them on request. Data inside our products for
            paying customers is governed by the customer agreement.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry emails for as long as needed to respond and to maintain a record of our
            business conversations, and delete them on request.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete the personal information we hold about you by
            writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
