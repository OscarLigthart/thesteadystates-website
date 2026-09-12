import { useEffect, useRef } from "react";

// Native <dialog> gives us the modal backdrop, focus trap and Esc-to-close for free.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const ref = useRef(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onNavigate]);

  const item = open ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => {
        // The inner wrapper fills the dialog, so "outside the media" means
        // hitting either the dialog itself or that wrapper's padding.
        if (e.target === ref.current || e.target.classList.contains("lightbox__inner")) onClose();
      }}
    >
      {item && (
        <div className="lightbox__inner">
          <button className="lightbox__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            aria-label="Previous"
          >
            ‹
          </button>

          {item.youtubeId ? (
            <div className="lightbox__video">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img src={`${import.meta.env.BASE_URL}photos/${item.src}`} alt={item.alt || "The Steady States live"} />
          )}

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onNavigate((index + 1) % items.length)}
            aria-label="Next"
          >
            ›
          </button>

          <div className="lightbox__counter">
            {index + 1} / {items.length}
          </div>
        </div>
      )}
    </dialog>
  );
}
