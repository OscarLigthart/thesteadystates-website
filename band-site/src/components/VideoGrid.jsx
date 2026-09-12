import { useState } from "react";
import Lightbox from "./Lightbox";

const thumbUrl = (id, size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

// A missing maxres thumbnail is not an error: YouTube answers 404 with a valid
// 120x90 grey JPEG, which the browser decodes and reports as a successful load.
// So spot it by its size rather than waiting for an error that never comes.
const PLACEHOLDER_WIDTH = 120;

function Thumb({ id }) {
  const [src, setSrc] = useState(() => thumbUrl(id, "maxresdefault"));
  const useFallback = () => setSrc(thumbUrl(id, "hqdefault"));

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onLoad={(e) => e.currentTarget.naturalWidth <= PLACEHOLDER_WIDTH && useFallback()}
      onError={useFallback}
    />
  );
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
  </svg>
);

export default function VideoGrid({ videos }) {
  const [index, setIndex] = useState(null);
  // Only videos with an id can open; the rest are inert placeholders.
  const playable = videos.filter((v) => v.youtubeId);

  return (
    <>
      <div className="video-grid">
        {videos.map((v, i) => {
          const ready = Boolean(v.youtubeId);
          const Tag = ready ? "button" : "div";
          return (
            <Tag
              className={`video-tile${ready ? "" : " video-tile--placeholder"}`}
              key={`${v.title}-${i}`}
              onClick={ready ? () => setIndex(playable.indexOf(v)) : undefined}
            >
              <div className="video-tile__frame">
                {ready ? (
                  <Thumb id={v.youtubeId} />
                ) : null}
                <span className="video-tile__play">
                  <PlayIcon />
                </span>
                {ready ? null : <span className="video-tile__soon">Coming soon</span>}
              </div>
              <div className="video-tile__meta">
                <div className="video-tile__title">{v.title}</div>
                {v.meta ? <div className="video-tile__sub">{v.meta}</div> : null}
              </div>
            </Tag>
          );
        })}
      </div>

      <Lightbox items={playable} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </>
  );
}
