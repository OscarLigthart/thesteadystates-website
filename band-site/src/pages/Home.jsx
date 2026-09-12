import { Link } from "react-router-dom";
import photos from "../content/photos.json";
import videos from "../content/videos.json";
import PhotoGrid from "../components/PhotoGrid";
import VideoGrid from "../components/VideoGrid";
import About from "./About";
import Gigs from "./Gigs";

// Sneak preview only — the full set lives on /photos.
const PREVIEW_PHOTOS = ["dscf1196", "dscf1228", "dscf1651"];

// Gimme Gimme Gimme (2025), Stare Into The Sun, Go Your Own Way.
const FEATURED_VIDEOS = ["R749KcpaXjQ", "II9wIbx25rg", "tER9vo9No9Q"];

export default function Home() {
  const preview = PREVIEW_PHOTOS.map((name) => photos.find((p) => p.src === `${name}.jpg`)).filter(Boolean);
  const featured = FEATURED_VIDEOS.map((id) => videos.find((v) => v.youtubeId === id)).filter(Boolean);

  return (
    <>
      <section id="home" className="hero" aria-label="Homepage hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="title">The Steady<br className="mobile-break" /> States</h1>
        </div>
      </section>

      <About />

      <section id="photos-preview" className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Photos</h2>
            <Link className="btn btn--ghost btn--small" to="/photos">
              See all {photos.length}
            </Link>
          </div>
          <p className="lead">A few frames from the front row.</p>
        </div>
        <div className="bleed">
          <PhotoGrid photos={preview} variant="preview" />
        </div>
      </section>

      <section id="videos-preview" className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Videos</h2>
            <Link className="btn btn--ghost btn--small" to="/videos">
              See all
            </Link>
          </div>
          <p className="lead">Three of ours. The rest are on the videos page.</p>
        </div>
        <div className="bleed">
          <VideoGrid videos={featured} />
        </div>
      </section>

      <Gigs />
    </>
  );
}
