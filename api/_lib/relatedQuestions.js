import faqData, { DEFAULT_CHAIN_ORDER } from "./faq.js";

const byId = new Map(faqData.map((entry) => [entry.id, entry]));

function toChip(id) {
  const entry = byId.get(id);
  return entry && entry.question ? { id, question: entry.question } : null;
}

// Suggests up to 4 fresh, on-topic follow-up questions: prefers the matched
// topic's own `related` list, then backfills from the default chain order —
// always skipping anything already asked, so the chain keeps moving forward.
function getNextSuggestions(matchedId, askedIds = []) {
  const asked = new Set(askedIds);
  if (matchedId) asked.add(matchedId);

  const matchedEntry = matchedId ? byId.get(matchedId) : null;
  const candidates = [
    ...(matchedEntry && Array.isArray(matchedEntry.related) ? matchedEntry.related : []),
    ...DEFAULT_CHAIN_ORDER,
  ];

  const seen = new Set();
  const result = [];

  for (const id of candidates) {
    if (asked.has(id) || seen.has(id)) continue;
    const chip = toChip(id);
    if (!chip) continue;

    seen.add(id);
    result.push(chip);
    if (result.length === 4) break;
  }

  return result;
}

export { getNextSuggestions };
