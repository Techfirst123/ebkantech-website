import { useEffect, useRef, useState } from "react";

/**
 * Floating "EPC ERP Assistant" chat widget — adapted from the standalone
 * Assistant Manager client into a launcher + panel that sits on top of the
 * main site. Talks to /api/assistant (FAQ match first, Groq/Gemini
 * fallback). Uses the shared dark-surface tokens rather than a private
 * copy of the palette.
 *
 * Talks to /api/assistant, a serverless function in this same repo — no
 * second host, no cross-origin config, no separate deploy to keep in sync.
 */

const API_URL = "/api/assistant";

const WELCOME_MESSAGE =
  "Hi, I'm the EPC ERP Assistant. Ask me anything about how the platform works.";

const SUGGESTED_QUESTIONS = [
  "How do you map field data with the progress report?",
  "How do you map work progress with payment milestones?",
  "What kind of reports do you provide?",
  "How do you manage warehouse?",
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CHARS_PER_TICK = 3;
const TICK_MS = 18;

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.5-.75L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
    </svg>
  );
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState(SUGGESTED_QUESTIONS);
  const [askedTopicIds, setAskedTopicIds] = useState([]);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const streamReply = (fullText) => {
    return new Promise((resolve) => {
      setMessages((prev) => [...prev, { role: "assistant", text: "", streaming: true }]);
      let shown = 0;
      const tick = () => {
        shown = Math.min(shown + CHARS_PER_TICK, fullText.length);
        const done = shown >= fullText.length;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            text: fullText.slice(0, shown),
            streaming: !done,
          };
          return updated;
        });
        if (done) resolve();
        else setTimeout(tick, TICK_MS);
      };
      setTimeout(tick, TICK_MS);
    });
  };

  // Greet the visitor the first time the panel is opened, not on page load.
  useEffect(() => {
    if (!open || initialized.current) return;
    initialized.current = true;
    (async () => {
      setLoading(true);
      await wait(400 + Math.random() * 300);
      setLoading(false);
      setIsStreaming(true);
      await streamReply(WELCOME_MESSAGE);
      setIsStreaming(false);
    })();
  }, [open]);

  const sendMessage = async (question = null) => {
    const userMessage = (question ?? message).trim();
    if (!userMessage || loading || isStreaming) return;

    const recentHistory = messages.slice(-8);
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    const thinkingDelay = wait(700 + Math.random() * 500);
    let replyText;

    try {
      const [res] = await Promise.all([
        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            language: "english",
            history: recentHistory,
            askedTopicIds,
          }),
        }).then((r) => r.json()),
        thinkingDelay,
      ]);

      replyText = res.reply || "Sorry, I didn't catch that — could you rephrase?";

      if (res.matchedTopicId) {
        const id = res.matchedTopicId;
        setAskedTopicIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      }
      setSuggestions(Array.isArray(res.suggestions) ? res.suggestions.map((s) => s.question) : []);
    } catch (err) {
      console.error("Assistant error:", err);
      await thinkingDelay;
      replyText = "Sorry, something went wrong reaching the assistant. Please try again shortly.";
    }

    setLoading(false);
    setIsStreaming(true);
    await streamReply(replyText);
    setIsStreaming(false);
    inputRef.current?.focus();
  };

  const showSuggestions = suggestions.length > 0 && !loading && !isStreaming;

  return (
    <div className="aw-root">
      {open && (
        <div className="aw-panel" role="dialog" aria-label="EPC ERP Assistant chat">
          <div className="aw-header">
            <span className="aw-avatar">⚙</span>
            <div className="aw-titles">
              <div className="aw-title">EPC ERP Assistant</div>
              <div className="aw-status">
                <span className="aw-status-dot" /> Online
              </div>
            </div>
            <button
              type="button"
              className="aw-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="aw-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div className={`aw-row ${m.role}`} key={i}>
                <div className="aw-bubble">
                  {m.text}
                  {m.streaming && <span className="aw-cursor" />}
                </div>
              </div>
            ))}

            {loading && (
              <div className="aw-row assistant">
                <div className="aw-bubble">
                  <span className="aw-typing">
                    <i /><i /><i />
                  </span>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="aw-suggested">
                <p>You can ask me:</p>
                <div className="aw-chips">
                  {suggestions.map((q) => (
                    <button key={q} className="aw-chip" onClick={() => sendMessage(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="aw-input-bar">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask something about the ERP..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              type="button"
              className="aw-send"
              onClick={() => sendMessage()}
              disabled={loading || isStreaming || !message.trim()}
              aria-label="Send"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="aw-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}
