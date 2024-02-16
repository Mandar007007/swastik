import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation"

const Hero = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();

    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const animationVariants = {
        hidden: { opacity: 0, x: 2000 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 1,
                ease: "easeOut",
                damping: 12, // Adjust the damping value for the bounce effect
            },
        },
    };
    const animationVariants2 = {
        hidden: { opacity: 0, x: -2000 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: 1,
                ease: "easeOut",
                damping: 12, // Adjust the damping value for the bounce effect
            },
        },
    };
    
    

    useEffect(() => {
        if (inView1) {
            controls1.start("hidden");
        } else {
            controls1.start("visible");
        }
        if (inView2) {
            controls2.start("hidden");
        } else {
            controls2.start("visible");
        }

    }, [controls1, inView1,controls2,inView2]);

    return (
        <div className=" bg-gray-50 flex flex-col justify-center relative">
            <div className="mx-auto">

                <div className="absolute -inset-1 bg-gradient-to-t from-[#fddace] via-white to-white rounded-lg blur opacity-25"></div>

                <div className="relative">
                    <div className="relative w-full h-full flex flex-col justify-center items-center ">

                        <div className=" w-full flex flex-col lg:flex-row">
                            {/* :HERO MAIN */}
                            <motion.div ref={ref1}
                                initial="hidden"
                                animate={controls1}
                                variants={animationVariants} data-scroll data-scroll-direction="horizontal" data-scroll-speed="3" className="w-full lg:w-1/2 flex flex-col justify-center items-center text-black"> {/* Container */}
                                {/* ::Hero Inner */}
                                <div className="p-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                                    {/* Hero Title */}
                                    <TypeAnimation
                                        sequence={[
                                            // Same substring at the start will only be typed once, initially
                                            'AI Assistant,',
                                            1000,
                                            'Speech to Text,',
                                            1000,
                                            'PDF QnA',
                                            1000,

                                        ]}
                                        speed={50}
                                        repeat={Infinity}
                                        className="text-3xl sm:text-[40px]"
                                    />
                                    <h1 className="py-10 text-3xl sm:text-5xl font-light tracking-wide">Learning is easier<br /> with AI.</h1>
                                    {/* Starting Price */}
                                    <p className="text-lg font-semibold text-gray-800 tracking-wide">Learn with your pace...</p>
                                    <div className="flex text-[4vw] text-[#aeaeae]">
                                        <p data-scroll data-scroll-position="top" data-scroll-speed="3" data-scroll-delay="0.06">V</p>
                                        <p data-scroll data-scroll-position="top" data-scroll-speed="5" data-scroll-delay="0.06">1</p>
                                        <p data-scroll data-scroll-position="top" data-scroll-speed="2" data-scroll-delay="0.06">.</p>
                                        <p data-scroll data-scroll-position="top" data-scroll-speed="4" data-scroll-delay="0.06">X</p>
                                    </div>
                                    {/* Buttons */}
                                    <div className="mt-10 flex flex-col sm:flex-row items-center">
                                        <button type="button" className="text-white bg-gradient-to-br rounded-full from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-5 py-2.5 text-center">
                                            Get Started
                                        </button>

                                    </div>
                                </div>
                            </motion.div>
                            {/* :HERO ILLUSTRATION */}
                            <motion.div ref={ref2}
                                initial="hidden"
                                animate={controls2}
                                variants={animationVariants2} data-scroll data-scroll-direction="horizontal" data-scroll-speed="-3" className="relative lg:w-[700px] h-[550px] flex flex-col justify-center items-center overflow-hidden">
                                <img src="./src/assets/hero8.png" alt="" className=" h-[550px] hover:scale-110 transition duration-500 cursor-pointer" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero