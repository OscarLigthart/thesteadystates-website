import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Landing on /#about from another page needs a scroll once the section exists;
// a plain route change should start at the top.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}
