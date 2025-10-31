import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../../constants";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Cocktails = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    if (!isMobile) {
      const parallaxTimelineLeft = gsap.timeline({
        scrollTrigger: {
          trigger: "#cocktails",
          start: "top 30%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      const parallaxTimelineRight = gsap.timeline({
        scrollTrigger: {
          trigger: "#cocktails",
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
      parallaxTimelineLeft.fromTo(
        "#c-left-leaf",
        {
          x: -150,
          y: 100,
        },
        {
          x: 0,
          y: 0,
        }
      );
      parallaxTimelineRight.fromTo(
        "#c-right-leaf",
        {
          x: 100,
          y: 100,
          ease: "power1.out",
        },
        {
          x: -10,
          y: 50,
          ease: "power1.out",
        }
      );
    }
  }, []);
  return (
    <section id="cocktails" className="noisy">
      {!isMobile && (
        <>
          <img
            src="/images/cocktail-left-leaf.png"
            alt="left-leaf"
            id="c-left-leaf"
          />
          <img
            src="/images/cocktail-right-leaf.png"
            alt="right-leaf"
            id="c-right-leaf"
          />
        </>
      )}
      <div className="list">
        <div className="popular">
          <h2>Most popular Cocktails:</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Most loved Mocktails:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
