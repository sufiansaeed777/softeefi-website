import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Data describing every step in the process.  Extend or edit as required.
 */
const STEPS = [
  {
    icon: "🔍",
    title: "Discovery",
    description:
      "We analyse your needs and goals to craft the perfect digital strategy.",
  },
  {
    icon: "⚡",
    title: "Development",
    description:
      "Our engineers build robust solutions with a modern, scalable stack.",
  },
  {
    icon: "🤖",
    title: "Integration",
    description:
      "We seamlessly plug AI & cloud services in for maximum efficiency.",
  },
  {
    icon: "🚀",
    title: "Growth",
    description:
      "Launch and iterate with data‑driven marketing to reach the right people.",
  },
];

/**
 * Framer‑motion variants so each card comes from the bottom and fades in.
 */
const cardVariants = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * ProcessScrollSection – full‑screen, vertical‑stack, snap‑scroll component.
 */
const ProcessScrollSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");

      // Pin the entire section while we reveal each card.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}vh`, // one viewport per card
        pin: true,
        scrub: true,
      });

      // Animate each card in sequence.
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: () => `top +=${i * 100}vh`, // stagger 100vh apart
              end: () => `+=100vh`,
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="process-scroll-section">
      {STEPS.map((step, i) => (
        <motion.article
          key={step.title}
          className="process-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="card-inner">
            <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="step-icon" aria-hidden>{step.icon}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </motion.article>
      ))}

      {/* STYLES ----------------------------------------------------------------*/}
      <style jsx>{`
        .process-scroll-section {
          position: relative;
          width: 100%;
          /* height extends automatically; gsap pins & handles scroll length */
          background: #0d1117;
          color: #ffffff;
          overflow: visible;
        }

        .process-card {
          position: relative;
          height: 100vh; /* one card per viewport */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
        }

        .card-inner {
          text-align: center;
          max-width: 600px;
        }

        .step-number {
          display: block;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          margin-bottom: 0.75rem;
          color: #00ff7f;
          font-weight: 600;
        }

        .step-icon {
          display: inline-block;
          font-size: 3rem;
          margin-bottom: 1.25rem;
        }

        h3 {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 800;
          margin-bottom: 0.75rem;
          color: #00ff7f;
        }

        p {
          font-size: 1.1rem;
          color: #c9d1d9;
          line-height: 1.6;
        }

        /* Small devices tweaks */
        @media (max-width: 768px) {
          .process-card {
            padding: 0 1.25rem;
          }
          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessScrollSection;