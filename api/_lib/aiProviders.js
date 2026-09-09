import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

function buildSystemPrompt(language) {
  let languageInstruction = "Answer the user in clear and natural English.";

  if (language === "hindi") {
    languageInstruction = "Answer the user in simple and natural Hindi.";
  } else if (language === "hinglish") {
    languageInstruction =
      "Answer the user in natural Hinglish using Roman Hindi mixed with simple English.";
  }

  return `You are a helpful product assistant for an EPC ERP platform — a single system built for
EPC (Engineering, Procurement, Construction) companies that unifies field progress tracking,
vendor/contractor payments, quality inspection sign-offs, and an AI layer for reporting.

The people you talk to are B2B prospects (EPC companies) evaluating the platform, not consumers.
Speak in a professional, concise B2B tone.

You help them understand:
- Field data capture (site engineers log stage-wise work updates, inspection checklists, photos, readings, sign-offs — all flow into the ERP in real time)
- Milestone mapping (project scope split into milestones: PV, Structure, DC, Inverter, AC, Transformer, HT, Earthing, SCADA, Testing, Handover)
- Vendor & payment mapping (a milestone is verified against its inspection sign-off, and only then is the vendor payment triggered — no manual chasing)
- The AI Assistant layer (tracks progress vs. plan, flags risks/delays early, auto-generates quotations and reports)
- The unified dashboard (progress by project/vendor/area, profit-loss visibility, real-time execution status)

Keep answers concise and practical. If asked about pricing or to see it in action, suggest sharing company details so the team can set up a demo. If the user greets you or makes small talk (e.g. "how are you"), reply briefly and warmly in one line, then ask how you can help them understand the platform. Politely decline unrelated topics and steer back to the ERP/EPC operations domain.

If asked for specifics you don't know from the list above (e.g. exact warehouse/inventory workflows, exact onboarding steps, pricing numbers), do not invent details — say that varies by setup and offer to have the team walk them through it on a call/demo.

When an answer involves multiple steps or points (e.g. a process, a list of factors), put each one on its own new line, like:
1) First step
2) Second step
Do not cram steps into one paragraph separated by commas.

Reply in plain text only — no markdown (no **bold**, no #headings, no backticks), since the reply is shown as-is in a chat bubble.

${languageInstruction}`;
}

async function askGroq(systemPrompt, history, message) {
  if (!groq) throw new Error("Groq is not configured");

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((h) => ({
      role: h.role === "user" ? "user" : "assistant",
      content: h.text,
    })),
    { role: "user", content: message },
  ];

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages,
    temperature: 0.4,
  });

  const reply = completion.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Empty reply from Groq");
  return reply;
}

async function askGemini(systemPrompt, history, message) {
  if (!gemini) throw new Error("Gemini is not configured");

  const contents = [
    ...history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await gemini.models.generateContent({
    model: "gemini-3.7-flash",
    contents,
    config: { systemInstruction: systemPrompt },
  });

  const reply = response.text?.trim();
  if (!reply) throw new Error("Empty reply from Gemini");
  return reply;
}

// Tries each configured provider in order and returns the first successful
// reply. Free-tier providers each have their own rate limits, so falling
// through to the next one keeps the bot answering instead of erroring out.
async function getAIReply({ message, language, history = [] }) {
  const systemPrompt = buildSystemPrompt(language);
  const trimmedHistory = history.slice(-8);

  const providers = [
    { name: "groq", run: () => askGroq(systemPrompt, trimmedHistory, message) },
    { name: "gemini", run: () => askGemini(systemPrompt, trimmedHistory, message) },
  ];

  let lastError = new Error("No AI provider is configured");

  for (const provider of providers) {
    try {
      const reply = await provider.run();
      return { reply, provider: provider.name };
    } catch (err) {
      console.log(`[${provider.name}] failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError;
}

export { getAIReply };
