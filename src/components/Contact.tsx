import { openingHours, socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Contact = () => {
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const textLineSplit = new SplitText(
        ".content > div > p, .content > div > h2, .content > div > h3, .content > h2",
        {
          type: "lines",
        }
      );
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top center",
        },
        ease: "power1.inOut",
      });
      scrollTimeline
        .fromTo(
          "#f-left-leaf",
          {
            opacity: 0,
            yPercent: 100,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
          },
          0
        )
        .fromTo(
          "#f-right-leaf",
          {
            opacity: 0,
            yPercent: -100,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
          },
          0
        )
        .fromTo(
          textLineSplit.lines,
          {
            opacity: 0,
            yPercent: -100,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
            stagger: 0.01,
          },
          0
        );
      return () => {
        scrollTimeline.kill();
        textLineSplit.revert();
      };
    });
  }, []);
  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="right-leaf"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="left-leaf"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Where to Find Us</h2>
        <div>
          <h3>visit our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((item) => (
            <p key={item.day}>
              {item.day}: {item.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Source</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
