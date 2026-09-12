import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <ScrollToHash />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} The Steady States</span>
      </footer>
    </div>
  );
}
