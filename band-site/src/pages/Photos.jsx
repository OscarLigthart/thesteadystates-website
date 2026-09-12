import photos from "../content/photos.json";
import PhotoGrid from "../components/PhotoGrid";

export default function Photos() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Photos</h2>
        <p className="lead">Every frame we could get our hands on. Click one to blow it up.</p>
      </div>
      <div className="bleed">
        <PhotoGrid photos={photos} />
      </div>
    </section>
  );
}
