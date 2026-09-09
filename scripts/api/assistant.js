import { matchFAQ } from "./_lib/faqMatcher.js";
import { getAIReply } from "./_lib/aiProviders.js";
import { getNextSuggestions } from "./_lib/relatedQuestions.js";

/**
 * Assistant endpoint.
 *
 * Previously an always-on Express server that needed its own host. It's
 * a serverless function now — same logic, same repo, same deploy as the
 * rest of the site, and no second provider to pay for or keep awake.
 *
 * Answers from the local FAQ first (instant, no token spend) and only
 * falls through to Groq/Gemini when nothing matches.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, language = "english", history = [], askedTopicIds = [] } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "A message is required." });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long." });
  }

  try {
    const match = matchFAQ(message);

    if (match) {
      return res.status(200).json({
        reply: match.answer,
        matchedTopicId: match.id,
        source: "faq",
        suggestions: getNextSuggestions(match.id, askedTopicIds),
      });
    }

    const reply = await getAIReply({ message, language, history });

    return res.status(200).json({
      reply,
      matchedTopicId: null,
      source: "ai",
      suggestions: getNextSuggestions(null, askedTopicIds),
    });
  } catch (err) {
    console.error("Assistant error:", err);
    return res.status(500).json({
      error: "Assistant unavailable",
      reply:
        "Sorry, I couldn't process that just now. Please try again, or email sales@ebkantech.com.",
    });
  }
}
