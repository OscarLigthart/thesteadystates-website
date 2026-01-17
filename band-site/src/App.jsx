import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Gigs from "./pages/Gigs";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main">
        <Home />
        <About />
        <Gigs />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} The Steady States</span>
      </footer>
    </div>
  );
}