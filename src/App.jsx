import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FloatingContactButtons from "./components/UI/FloatingContactButtons";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded page routes for optimized code splitting & fast initial page load
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

function PageFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#E9E6DD]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-[0.2em] text-[#555] font-medium">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Scroll to top on every route change */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>

          <FloatingContactButtons />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
