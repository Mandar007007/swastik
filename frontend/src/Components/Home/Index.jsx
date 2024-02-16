import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Home/Hero";
import Features from "./Features";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Testimonials from "./Testimonials";
import { initFlowbite } from "flowbite";
import Offerings from "./Offering";
import Footer from "../Footer/Footer";

const Index = () => {
  const [show, setShow] = useState(true);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);

  const controls1 = useAnimation();
  const controls2 = useAnimation();


  useEffect(() => {
    initFlowbite();
    // eslint-disable-next-line no-undef
    const scroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, [show]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowText1(true);
      setShowText2(false);
      setShowText3(false);
    }, 2000);

    const timer2 = setTimeout(() => {
      setShowText1(false);
      setShowText2(true);
      setShowText3(false);
    }, 4000);

    const timer3 = setTimeout(() => {
      setShowText1(false);
      setShowText2(false);
      setShowText3(true);
    }, 6000);

    const timer4 = setTimeout(() => {
      setShow(false);
    }, 8700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      gsap.to('.black-screen', {
        duration: 0.9,
        y: -700,
        ease: 'power2.inOut' // Choose the ease type you prefer
      });
    }, 8000)
  }, [])

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView1) {
      controls1.start("visible");
    } else {
      controls1.start("hidden");
    }
    if (inView2) {
      controls2.start("visible");
    } else {
      controls2.start("hidden");
    }
  }, [controls1, inView1,inView2,controls2]);

  const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        ease: "easeOut",
        damping: 12,
      },
    },
  };

  const animationVariants2 = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <div id="main">
        {show && (
          <motion.div>
            <div
              className="black-screen"
              style={{
                background: "black",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div className="texts flex" style={{ textAlign: "center" }}>
                {showText1 && (
                  <h1
                    className="text1 text-[40px]"
                    style={{
                      position: "absolute",
                      color: "transparent",
                      backgroundImage:
                        "linear-gradient(200deg, #fe330a, #ff9831)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      fontSize: "9vw",
                      fontWeight: "500",
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    Welcome
                  </h1>
                )}
                {showText2 && (
                  <h1
                    className="text2 text-[40px]"
                    style={{
                      position: "absolute",
                      color: "transparent",
                      backgroundImage:
                        "linear-gradient(200deg, #fe330a, #ff9831)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      fontSize: "9vw",
                      fontWeight: "500",
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    Discover
                  </h1>
                )}
                {showText3 && (
                  <h1
                    className="text3 text-[40px]"
                    style={{
                      position: "absolute",
                      color: "transparent",
                      backgroundImage:
                        "linear-gradient(200deg, #fe330a, #ff9831)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      fontSize: "9vw",
                      fontWeight: "500",
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    Create
                  </h1>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {!show && <div>
          <motion.div
            ref={ref1}
            initial="hidden"
            animate={controls1}
            variants={animationVariants}
          >
          </motion.div>

          <Navbar />
          <Hero />
          <Features />

          <Offerings />

          <motion.div
            ref={ref2}
            initial="hidden"
            animate={controls2}
            variants={animationVariants2}
            className="Testimonials"
          >
            <Testimonials />
          </motion.div>

          <Footer />
        </div>}
      </div>
    </>
  );
};

export default Index;
