import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: containerRef.current,
      content: contentRef.current,
      smooth: 1,
      smoothTouch: 0.1,
    });
  }, []);
  return (
    <div ref={containerRef}>
      <main ref={contentRef}>
        <Navbar />
        <Hero />
        <div className="h-screen bg-amber-50"></div>
      </main>
    </div>
  );
};

export default App;
