import { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCocktails = sliderLists.length;

  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex((slideIndex + totalCocktails) % totalCocktails);
  };

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const getCocktailAt = (indexOffset: number) => {
    const index = mod(currentIndex + indexOffset, totalCocktails);
    return sliderLists[index];
  };

  const currentCocktail = getCocktailAt(0);
  const nextCocktail = getCocktailAt(1);
  const prevCocktail = getCocktailAt(-1);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const content = contentRef.current;
      const details = detailsRef.current;

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top center",
          toggleActions: "restart pause resume pause",
        },
      });

      scrollTimeline
        .fromTo(
          content,
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power1.inOut",
          },
          0
        )
        .fromTo(
          details,
          { xPercent: 100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power1.inOut",
          },
          0
        )
        .fromTo(
          ".cocktail > img",
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0
        );
    });
  }, [currentIndex]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#menu",
        start: "top center",
      },
    });
    tl.fromTo(
      "#m-left-leaf",
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      },
      0
    ).fromTo(
      "#m-right-leaf",
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
      },
      0.1
    );
  });

  return (
    <section id="menu" aria-label="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={item.id}
              className={
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }
              onClick={() => goToSlide(index)}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt="current-cocktail"
            className="object-contain"
          />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipie for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details" ref={detailsRef}>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
