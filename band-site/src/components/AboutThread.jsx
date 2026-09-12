import { useEffect, useLayoutEffect, useRef, useState } from "react";
import members from "../content/members.json";
import { AMP, anchorFor, buildStem, buildRib, ribTarget } from "./threadGeometry";

const STEPS = [
  {
    img: "timeline/01-office.jpg",
    title: "The office",
    body: "A lunch break, a borrowed amp and a Vinted meeting room that never stood a chance.",
  },
  {
    img: "timeline/02-outdoor.jpg",
    title: "The first real stage",
    body: "Outdoors, under a tent, in questionable trousers. Somebody clapped, so we kept going.",
  },
  {
    img: "timeline/03-venue.jpg",
    title: "A room full of people",
    body: "Chandeliers, a proper crowd, and hands in the air. Still the same six nerds.",
  },
];

const clamp01 = (n) => Math.min(1, Math.max(0, n));

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.3" />
    <path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

function MemberImage({ imgPath, name }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !imgPath) return <ProfileIcon />;

  return (
    <>
      {!loaded && <ProfileIcon />}
      <img
        src={`${import.meta.env.BASE_URL}${imgPath.replace(/^\//, "")}`}
        alt={name}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
    </>
  );
}

const EMPTY = { stem: "", dots: [], ribs: [], apex: null, w: 0, h: 0, apexY: 0 };

export default function AboutThread() {
  const base = import.meta.env.BASE_URL;
  const wrapRef = useRef(null);
  const stemRef = useRef(null);
  const ribRefs = useRef([]);
  const [geom, setGeom] = useState(EMPTY);
  const [shown, setShown] = useState(() => new Set());

  // Measured in the wrapper's own pixel space, so the SVG can span the full
  // width the ribs need to reach.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const steps = Array.from(wrap.querySelectorAll(".timeline__step"));
      const cards = Array.from(wrap.querySelectorAll(".member-card"));
      const grid = wrap.querySelector(".member-grid");
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      const cx = w / 2;

      const dots = steps.map((el, i) => anchorFor(i, el, cx, AMP));

      // The apex sits in the gap between the last photo and the first cards.
      const lastStep = steps[steps.length - 1];
      const stemEnd = lastStep ? lastStep.offsetTop + lastStep.offsetHeight : 0;
      const gridTop = grid ? grid.offsetTop : h;
      const apexY = stemEnd + (gridTop - stemEnd) * 0.6;
      const apex = { x: cx, y: apexY };

      setGeom({
        w,
        h,
        apex,
        apexY,
        dots,
        stem: buildStem(dots, apexY, cx),
        ribs: cards.map((card) => {
          const target = ribTarget(card, cx);
          return { d: buildRib(apex, target), y: target.y };
        }),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Reveal cards — and with them, their rib — as they come into view.
  useEffect(() => {
    const items = wrapRef.current?.querySelectorAll("[data-thread-key]");
    if (!items?.length) return;

    if (reduceMotion()) {
      setShown(new Set(Array.from(items, (el) => el.dataset.threadKey)));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const arrived = entries.filter((e) => e.isIntersecting).map((e) => e.target.dataset.threadKey);
        if (!arrived.length) return;
        setShown((prev) => new Set([...prev, ...arrived]));
        entries.forEach((e) => e.isIntersecting && io.unobserve(e.target));
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // A single scroll "front" travels down the thread: it draws the stem to the
  // apex, then opens each rib as it passes that card, fading it up as it goes.
  useEffect(() => {
    const stem = stemRef.current;
    const wrap = wrapRef.current;
    if (!stem || !wrap || !geom.stem) return;

    // The stem only draws — fading it would dim the length already behind the
    // front. Each rib tracks its own stretch, so fading it reads correctly.
    const paint = (el, progress, fade) => {
      if (!el) return;
      el.style.strokeDashoffset = `${1 - progress}`;
      if (fade) el.style.opacity = `${progress}`;
    };

    if (reduceMotion()) {
      paint(stem, 1, false);
      ribRefs.current.forEach((el) => paint(el, 1, true));
      return;
    }

    const render = () => {
      const { top } = wrap.getBoundingClientRect();
      // How far into the thread the front has travelled, in wrapper pixels.
      const front = window.innerHeight * 0.72 - top;

      paint(stem, clamp01(front / geom.apexY), false);
      ribRefs.current.forEach((el, i) => {
        const span = (geom.ribs[i]?.y ?? 0) - geom.apexY;
        paint(el, span > 0 ? clamp01((front - geom.apexY) / span) : 1, true);
      });
    };

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        render();
      });
    };

    render();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [geom]);

  const isShown = (key) => shown.has(key);

  return (
    <div className="thread" ref={wrapRef}>
      <svg
        className="thread__spine"
        viewBox={`0 0 ${geom.w || 1} ${geom.h || 1}`}
        width={geom.w}
        height={geom.h}
        fill="none"
        aria-hidden="true"
      >
        <path d={geom.stem} className="thread__track" />
        {geom.ribs.map((rib, i) => (
          <path key={`rib-track-${i}`} d={rib.d} className="thread__track" />
        ))}

        <path d={geom.stem} ref={stemRef} className="thread__stem" pathLength="1" />
        {geom.ribs.map((rib, i) => (
          <path
            key={`rib-${i}`}
            d={rib.d}
            pathLength="1"
            className="thread__rib"
            ref={(el) => (ribRefs.current[i] = el)}
          />
        ))}

        {geom.dots.map((dot, i) => (
          <circle key={`dot-${i}`} cx={dot.x} cy={dot.y} r="6" className="thread__dot" />
        ))}
        {geom.apex && <circle cx={geom.apex.x} cy={geom.apex.y} r="5" className="thread__dot thread__dot--apex" />}
      </svg>

      <h3 className="thread__label">Where we've come from</h3>

      <ol className="timeline">
        {STEPS.map((step, i) => (
          <li
            className={`timeline__step${isShown(`step-${i}`) ? " is-visible" : ""}`}
            data-thread-key={`step-${i}`}
            key={step.title}
          >
            <div className="timeline__card">
              <div className="timeline__media">
                <img src={`${base}${step.img}`} alt={step.title} loading="lazy" />
              </div>
              <div className="timeline__body">
                <div className="timeline__title">{step.title}</div>
                <p>{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="thread__label thread__label--who">And who we are</h3>

      <div className="member-grid">
        {members.map((member, i) => (
          <div
            className={`member-card${isShown(`card-${i}`) ? " is-visible" : ""}`}
            data-thread-key={`card-${i}`}
            key={member.name}
          >
            <div className="member-card__image">
              <MemberImage imgPath={member.img_path} name={member.name} />
            </div>
            <div className="member-card__content">
              <div className="member-card__role">{member.role}</div>
              <div className="member-card__name">{member.name}</div>
              <p className="member-card__bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
