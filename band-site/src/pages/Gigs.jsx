import gigs from "../content/gigs.json";

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

export default function Gigs() {
  return (
    <section id="gigs" className="container">
      <h1>Coming Gigs</h1>
      <p className="lead">Catch us live—new dates added regularly.</p>

      <div className="stack">
        {gigs.map((g) => (
          <article className="gig" key={`${g.date}-${g.venue}`}>
            <div className="gig__date">{formatDate(g.date)}</div>
            <div className="gig__meta">
              <div className="gig__venue">{g.venue}</div>
              <div className="gig__city">{g.city}</div>
              {g.details ? <div className="gig__details">{g.details}</div> : null}
            </div>
            <div className="gig__cta">
              {g.ticketUrl ? (
                <a className="btn btn--small btn--primary" href={g.ticketUrl} target="_blank" rel="noreferrer">
                  Tickets
                </a>
              ) : (
                <span className="pill">Details soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
