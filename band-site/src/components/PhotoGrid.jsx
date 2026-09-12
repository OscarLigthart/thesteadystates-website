import { useState } from "react";
import Lightbox from "./Lightbox";

export default function PhotoGrid({ photos, variant }) {
  const [index, setIndex] = useState(null);
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <div className={`photo-grid${variant === "preview" ? " photo-grid--preview" : ""}`}>
        {photos.map((p, i) => (
          <button className="photo-tile" key={p.src} onClick={() => setIndex(i)} aria-label={`Open photo ${i + 1}`}>
            <img src={`${base}photos/thumbs/${p.src}`} alt="" loading="lazy" width={p.w} height={p.h} />
            <span className="photo-tile__glow" />
          </button>
        ))}
      </div>

      <Lightbox items={photos} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </>
  );
}
