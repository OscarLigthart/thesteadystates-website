import { useState, useEffect } from "react";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "gigs"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#home" className="nav__brand" onClick={(e) => scrollToSection(e, "home")}>
          The Steady States
        </a>

        <nav className="nav__links">
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "home")}
          >
            Home
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "about")}
          >
            About Us
          </a>
          <a
            href="#gigs"
            className={activeSection === "gigs" ? "active" : ""}
            onClick={(e) => scrollToSection(e, "gigs")}
          >
            Coming Gigs
          </a>
        </nav>
      </div>
    </header>
  );
}
