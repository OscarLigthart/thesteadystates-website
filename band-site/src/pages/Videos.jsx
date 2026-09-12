import videos from "../content/videos.json";
import VideoGrid from "../components/VideoGrid";

export const CHANNEL_URL = "https://www.youtube.com/@TheSteadyStates";

export default function Videos() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Videos</h2>
          <a className="btn btn--ghost btn--small" href={CHANNEL_URL} target="_blank" rel="noreferrer">
            YouTube channel
          </a>
        </div>
        <p className="lead">Every clip we've put out so far. Click one to play it here.</p>
      </div>
      <div className="bleed">
        <VideoGrid videos={videos} />
      </div>
    </section>
  );
}
