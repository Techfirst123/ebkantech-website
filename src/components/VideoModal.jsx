import { useCallback, useEffect, useRef } from "react";

/**
 * Full-screen player for a product walkthrough video.
 *
 * Mounts only while open, so the video file is never fetched on page load —
 * the markup (and the 36 MB request) simply don't exist until a visitor asks
 * for them. That also keeps it safe for the build-time prerender in
 * scripts/prerender.mjs: nothing here touches window/document during render.
 *
 * Behaviour: Escape or a backdrop click closes it, the page behind can't
 * scroll while it's up, focus moves into the dialog and returns to the button
 * that opened it, and the video is paused on close so audio never keeps
 * playing behind a closed overlay.
 */
export default function VideoModal({ open, onClose, video, accent }) {
  const videoRef = useRef(null);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  const close = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        /* some browsers throw if metadata isn't loaded yet — harmless */
      }
    }
    onClose();
  }, [onClose]);

  // Escape to close, and keep Tab inside the dialog while it's open.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll(
        'button, [href], video, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Lock background scroll without the page jumping as the scrollbar goes.
  useEffect(() => {
    if (!open) return undefined;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  // Move focus in on open, hand it back to the opener on close, and start
  // playback — allowed with sound because opening came from a real click.
  useEffect(() => {
    if (!open) return undefined;
    lastFocused.current = document.activeElement;
    closeRef.current?.focus();
    const el = videoRef.current;
    if (el) {
      const attempt = el.play();
      if (attempt && typeof attempt.catch === "function") {
        // Autoplay policies can still refuse; the controls are right there.
        attempt.catch(() => {});
      }
    }
    return () => {
      const prev = lastFocused.current;
      if (prev && typeof prev.focus === "function") prev.focus();
    };
  }, [open]);

  if (!open || !video) return null;

  return (
    <div
      className="vm-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="vm-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        style={accent ? { "--c-accent": accent } : undefined}
      >
        <div className="vm-bar">
          <p className="vm-title">{video.title}</p>
          <button type="button" className="vm-close" onClick={close} ref={closeRef} aria-label="Close video">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <video
          ref={videoRef}
          className="vm-video"
          src={video.src}
          poster={video.poster}
          controls
          controlsList="nodownload"
          playsInline
          preload="auto"
        >
          <p>
            Your browser can&apos;t play this video.{" "}
            <a href={video.src} download>
              Download the walkthrough
            </a>{" "}
            instead.
          </p>
        </video>
      </div>
    </div>
  );
}
