import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const SECTIONS = ["about", "photos-preview", "videos-preview", "gigs"];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHome]);

  // Section links live on the home page; from another route, go there first.
  const goToSection = (e, id) => {
    e.preventDefault();
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const sectionClass = (id) => (onHome && activeSection === id ? "active" : "");

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          The Steady States
        </Link>

        <nav className="nav__links">
          <a href="/#about" className={sectionClass("about")} onClick={(e) => goToSection(e, "about")}>
            About Us
          </a>
          <NavLink to="/photos" className={({ isActive }) => (isActive ? "active" : "")}>
            Photos
          </NavLink>
          <NavLink to="/videos" className={({ isActive }) => (isActive ? "active" : "")}>
            Videos
          </NavLink>
          <a href="/#gigs" className={sectionClass("gigs")} onClick={(e) => goToSection(e, "gigs")}>
            Gigs
          </a>
        </nav>
      </div>
    </header>
  );
}
