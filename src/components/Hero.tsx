import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      opacity: 0,
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      yPercent: -100,
      duration: 1.8,
      delay: 0.2,
      ease: "expo.out",
      opacity: 0,
      stagger: 0.1,
    });
    gsap.from(".left-leaf", {
      xPercent: -50,
      duration: 1.8,
      delay: 0.1,
      ease: "expo.out",
      opacity: 0,
    });
    gsap.from(".right-leaf", {
      xPercent: 50,
      duration: 1.8,
      delay: 0.2,
      ease: "expo.out",
      opacity: 0,
    });
    gsap.from(".href", {
      yPercent: 100,
      duration: 1.8,
      delay: 0.5,
      ease: "expo.out",
      opacity: 0,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
      .to(
        ".right-leaf",
        {
          yPercent: 200,
        },
        0
      )
      .to(
        ".left-leaf",
        {
          yPercent: -200,
        },
        0
      );
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - designed to delight
                senses
              </p>
              <a href="#cocktails" className="href">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
