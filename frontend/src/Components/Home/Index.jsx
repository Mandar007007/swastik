import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Home/Hero"
import Features from "./Features";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const Index = () => {
  const controls1 = useAnimation();

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true,

    });

    return () => {
      scroll.destroy();
    };
  }, []);

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView1) {
      controls1.start("visible");
    } else {
      controls1.start("hidden");
    }

  }, [controls1, inView1]);



  const animationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 1,
            ease: "easeOut",
            damping: 12, // Adjust the damping value for the bounce effect
        },
    },
};

  return (
    <>
      <div id="main">
        <motion.div ref={ref1}
          initial="hidden"
          animate={controls1}
          variants={animationVariants}>
          <Navbar />
        </motion.div>
        <Hero />
        <Features />
        <div className="mb-[100vh] h-[10vh]">
        </div>
      </div>
    </>
  )
}

export default Index
