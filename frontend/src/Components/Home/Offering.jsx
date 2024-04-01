import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useState } from "react";

function Offerings(params) {
    const navigate = useNavigate()

    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

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

      const fadeLeft = {
        hidden: { opacity: 0, x: -50 },
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
      }, [controls1, controls2, controls3, inView1, inView2, inView3]);

    return (
        <>
            <div className=" bg-[#fff6f3] pt-8 pb-12 md:px-16 lg:px-28 px-5">
                <div className=" mx-auto lg:flex lg:justify-center">
                    <div className=" relative lg:w-[1000px]">

                    <motion.div 
                        ref={ref1}
                        initial="hidden"
                        animate={controls1}
                        variants={animationVariants}
                        className=" text-[#fddace] font-bold md:text-[72px] text-[48px] text-center mb-8"
                    >OUR OFFERINGS
                    </motion.div>
                    
                        <div className=" hidden md:block absolute -top-8">
                            <div className=" border-l-2 border-b-2 border-dashed h-[14.5rem] w-[120px] ml-5" ></div>
                        </div>

                        <div className=" relative flex justify-end">
                            <div className=" hidden md:block md:absolute md:top-24 md:start-0 w-36">
                                <p className=" text-[36px] font-bold text-left" >AI Chatbot</p>
                            </div>
                            <div className=" bg-white min-h-[21rem] w-[58rem] md:ml-24 rounded-2xl md:flex md:items-center">
                                <div className=" md:hidden block mt-8">
                                    <p className=" text-[36px] font-bold text-center" >AI Chatbot</p>
                                </div>
                                <div className=" flex md:flex-row flex-col-reverse items-center md:py-12 py-8 px-10">
                                    <div className=" md:ml-10 md:mr-5 md:mt-0 mt-8">
                                        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At dolor perferendis quisquam debitis laborum dolorum pariatur, est suscipit excepturi sapiente.</h1>
                                        <NavLink
                                            to="/products"
                                            className="relative inline-flex items-center justify-center p-0.5 md:mt-10 mt-6 overflow-hidden text-sm font-medium text-gray-900 rounded-sm group bg-gradient-to-tr from-black to-gray-600 group-hover:from-black group-hover:to-gray-600 hover:text-white dark:text-white focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            <span className="px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                                                <p className="flex items-center justify-center" >Explore ChatBots <MdKeyboardDoubleArrowRight className=" text-[20px] ml-1" /> </p>
                                            </span>
                                        </NavLink>
                                    </div>
                                    <motion.div
                                        ref={ref2}
                                        initial="hidden"
                                        animate={controls2}
                                        variants={fadeRight}
                                    >
                                        <img src="./src/assets/ai2.png" onLoad={() => setIsLoaded(true)} className=" lg:h-[250px] lg:w-[800px] md:h-[180px] md:w-[700px] rounded-lg" />
                                    </motion.div>
                                </div>
                                
                            </div>
                        </div>

                        <div className=" relative flex justify-start mt-16">

                            <div className=" hidden md:block absolute end-0 -top-16">
                                <div className=" border-r-2 border-b-2 border-dashed h-[120px] w-[120px] mr-5" ></div>
                            </div>

                            <div className=" hidden md:block md:absolute md:top-24 md:end-0 w-36 z-20">
                                <p className=" text-[36px] font-bold text-right" >Create Module</p>
                            </div>

                            <div className=" bg-white min-h-[21rem] w-[58rem] md:mr-24 rounded-2xl z-10 md:flex md:items-center">
                                <div className=" md:hidden block mt-8">
                                    <p className=" text-[36px] font-bold text-center" >Create Module</p>
                                </div>
                                
                                <div className=" flex md:flex-row flex-col items-center md:py-12 py-8 px-10">
                                <motion.div
                                    ref={ref3}
                                    initial="hidden"
                                    animate={controls3}
                                    variants={fadeLeft}
                                >
                                    <img src="./src/assets/uploads.png" className="  lg:h-[250px] lg:w-[800px] md:h-[180px] md:w-[800px] rounded-lg" />
                                    </motion.div>
                                    <div className=" md:ml-5 md:mr-10 md:mt-0 mt-8">
                                        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At dolor perferendis quisquam debitis laborum dolorum pariatur, est suscipit excepturi sapiente.</h1>
                                        <NavLink
                                            to="/upload_files"
                                            className="relative inline-flex items-center justify-center p-0.5 md:mt-10 mt-6 overflow-hidden text-sm font-medium text-gray-900 rounded-sm group bg-gradient-to-tr from-black to-gray-600 group-hover:from-black group-hover:to-gray-600 hover:text-white dark:text-white focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            <span className="px-2.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                                                <p className="flex items-center justify-center" >Create Module <MdKeyboardDoubleArrowRight className=" text-[20px] ml-1" /> </p>
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Offerings;