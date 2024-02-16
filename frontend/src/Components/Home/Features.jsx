import { IoMicCircleOutline } from "react-icons/io5";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Avatar from "react-avatar";

function Features(params) {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const { ref: ref4, inView: inView4 } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
    if (inView3) {
      controls3.start("visible");
    } else {
      controls3.start("hidden");
    }
    if (inView4) {
      controls4.start("visible");
    } else {
      controls4.start("hidden");
    }
  }, [controls1, controls2, controls3, controls4, inView1, inView2, inView3, inView4]);

  return (
    <>
      <div className="main-container flex flex-col md:mb-28 mb-20">
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={controls1}
          variants={animationVariants}
          className="headings flex flex-col justify-center items-center w-full"
        >
          <h1 className=" text-[30px] font-semibold md:mt-28 mt-20 mb-3">Our Features</h1>
          <h1 className=" text-[18px] text-center mx-4">
            Swastik provide various features to make study easy.
          </h1>
        </motion.div>
        <div className="features grid md:grid-cols-3 grid-cols-1 gap-5 md:px-16 px-8 mt-10">
          <motion.div
            ref={ref2}
            initial="hidden"
            animate={controls2}
            variants={fadeRight}
            className="col-span-1 bg-[#f5f7fe] px-4 py-6"
          >
            <div className="flex flex-col items-center">
              {/* <IoMicCircleOutline className=" text-[80px] text-slate-700 mb-2" /> */}
              <div className=" p-1 bg-white rounded-lg mb-3">
                <Avatar src="./src/assets/microphone.png" size="80px" />  
              </div>
              <h1>Speech to Text</h1>
            </div>
          </motion.div>
          <motion.div
            ref={ref3}
            className="col-span-1 bg-[#f5f7fe] px-4 py-6"
            initial="hidden"
            animate={controls3}
            variants={fadeRight}
          >
            <div className="flex flex-col items-center">
              {/* <MdMarkUnreadChatAlt className=" text-[80px] text-slate-700 mb-2" /> */}
              <div className=" p-1 bg-white rounded-lg mb-3">
                <Avatar src="./src/assets/chat.png" size="80px" />
              </div>
              <h1>AI ChatBot</h1>
            </div>
          </motion.div>
          <motion.div
            ref={ref4}
            className="col-span-1 bg-[#f5f7fe] px-4 py-6"
            initial="hidden"
            animate={controls4}
            variants={fadeRight}
          >
            <div className="flex flex-col items-center">
              {/* <FaRegFilePdf className=" text-[80px] text-slate-700 mb-2" /> */}
              <div className=" p-1 bg-white rounded-lg mb-3">
                <Avatar src="./src/assets/pdf.png" size="80px" />
              </div>
              <h1>PDF Question Answering</h1>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Features;
