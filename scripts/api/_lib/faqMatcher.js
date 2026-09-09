import Fuse from "fuse.js";
import faqData from "./faq.js";

const SUPPORTED_LANGUAGES = ["english", "hindi", "hinglish"];
const indexByLanguage = {};

function buildIndex(language) {
  const items = [];

  faqData.forEach((entry) => {
    const aliases = entry.aliases[language] || [];
    aliases.forEach((text) => items.push({ id: entry.id, text }));
  });

  return new Fuse(items, {
    keys: ["text"],
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.4,
    minMatchCharLength: 3,
  });
}

function getIndex(language) {
  if (!indexByLanguage[language]) {
    indexByLanguage[language] = buildIndex(language);
  }
  return indexByLanguage[language];
}

function matchFAQ(message, language) {
  const lang = SUPPORTED_LANGUAGES.includes(language) ? language : "english";
  const results = getIndex(lang).search(message.trim());

  if (results.length === 0) return null;

  const entry = faqData.find((item) => item.id === results[0].item.id);
  if (!entry) return null;

  return { id: entry.id, answer: entry.answer[lang] };
}

export { matchFAQ };
