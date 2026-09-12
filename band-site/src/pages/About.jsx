import AboutThread from "../components/AboutThread";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <p className="lead">
          We met at Vinted, where we were just nerdy colleagues fixing bugs and shipping features.
          Late-night coding sessions turned into jam sessions, and before we knew it,
          we'd gone from debugging code to dropping beats. Now we're The Steady States—
          a party-inducing hit band that proves the best collaborations happen when you
          least expect them.
        </p>

        <AboutThread />
      </div>
    </section>
  );
}
