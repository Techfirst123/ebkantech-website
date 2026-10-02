/**
 * Company details used for SEO: page titles, Google structured data
 * (Organization / LocalBusiness), sitemap.xml and robots.txt.
 *
 * Fill in only REAL details. Anything left empty ("" or []) is simply left
 * out of what Google sees — never replaced with a guess.
 *
 * The NAME, ADDRESS and PHONE here should match your Google Business Profile
 * exactly (same spelling, same format). Google trusts listings more when the
 * website and the profile agree.
 */
export const SITE = {
  name: "Ebkan Tech Pvt Ltd",
  shortName: "Ebkan Tech",

  // The live address of the site — no trailing slash. Every canonical URL,
  // the sitemap and the structured data are built from this.
  url: "https://ebkantech.com",

  logo: "/ebkan-tech-logo.png",
  email: "sales@ebkantech.com",

  // e.g. "+91 98765 43210" — the public business number
  phone: "",

  // e.g. { street: "9th Floor, …", locality: "Noida", region: "Uttar Pradesh",
  //        postalCode: "201309", country: "IN" }
  address: { street: "", locality: "", region: "", postalCode: "", country: "IN" },

  // Official profiles, e.g. "https://www.linkedin.com/company/ebkan-tech"
  sameAs: [],

  // Google Search Console → "HTML tag" verification: paste only the
  // content="…" value here (or verify by DNS and leave this empty).
  googleVerification: "",

  description:
    "Ebkan Tech Pvt Ltd builds data science solutions and its own ERP and CRM products for power, solar, infrastructure, rental and sales teams.",
};
