import Avatar from "react-avatar";
import { RiDoubleQuotesL } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './styles.css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';

function Testimonials() {

    return (
        <>
            <div className="flex flex-col">
                <div className="headings flex flex-col justify-center items-center w-full">
                    <h1 className=" text-[30px] font-semibold mt-16 mb-16">What Our Client Says</h1>
                </div>
            </div>
            <div className="myTestinomial mx-10">
                <Swiper 
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards, Autoplay]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide className=" shadow-xl">
                        <div className=" max-w-[600px] min-h-[300px] mx-auto md:grid grid-cols-5 sm:flex bg-white p-6 border-t-4 border-b-4 border-[#e8f5f5] bg-gradient-to-tr from-[#f6fbfb] via-white to-[#f6fbfb]">
                            <div className=" col-span-2 flex justify-center items-center mb-5 md:mb-0">
                                <Avatar size="170px" round={true} class=" mb-3 shadow-lg" src="./src/assets/user2.png" alt="" />
                            </div>
                            <div className=" col-span-3 sm:pl-6 flex flex-col justify-center sm:items-start items-center ">
                                <div className=" mb-5 text-center sm:text-left">
                                    <RiDoubleQuotesL className=" text-[25px] text-red-600 sm:hidden text-center w-full mb-3" />
                                    <p><span><RiDoubleQuotesL className=" text-[25px] text-red-600 hidden sm:block" /></span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia veniam odit nisi omnis numquam odio molestiae</p>
                                </div>
                                <div className="">
                                    <h1 className=" text-[20px] font-semibold">Scarlet Rose</h1>
                                    <p className=" text-[13px]">Software Engineer</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className=" shadow-xl">
                        <div className=" max-w-[600px] min-h-[300px] mx-auto md:grid grid-cols-5 sm:flex bg-white p-6 border-t-4 border-b-4 border-[#e8f5f5] bg-gradient-to-tr from-[#f6fbfb] via-white to-[#f6fbfb]">
                            <div className=" col-span-2 flex justify-center items-center mb-5 md:mb-0">
                                <Avatar size="170px" round={true} class=" mb-3 shadow-lg" src="./src/assets/user7.png" alt="" />
                            </div>
                            <div className=" col-span-3 sm:pl-6 flex flex-col justify-center sm:items-start items-center ">
                                <div className=" mb-5 text-center sm:text-left">
                                    <RiDoubleQuotesL className=" text-[25px] text-red-600 sm:hidden text-center w-full mb-3" />
                                    <p><span><RiDoubleQuotesL className=" text-[25px] text-red-600 hidden sm:block" /></span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia veniam odit nisi omnis numquam odio molestiae</p>
                                </div>
                                <div className="">
                                    <h1 className=" text-[20px] font-semibold">John Smith</h1>
                                    <p className=" text-[13px]">Manager</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className=" shadow-xl">
                        <div className=" max-w-[600px] min-h-[300px] mx-auto md:grid grid-cols-5 sm:flex bg-white p-6 border-t-4 border-b-4 border-[#e8f5f5] bg-gradient-to-tr from-[#f6fbfb] via-white to-[#f6fbfb]">
                            <div className=" col-span-2 flex justify-center items-center mb-5 md:mb-0">
                                <Avatar size="170px" round={true} class=" mb-3 shadow-lg" src="./src/assets/user1.png" alt="" />
                            </div>
                            <div className=" col-span-3 sm:pl-6 flex flex-col justify-center sm:items-start items-center ">
                                <div className=" mb-5 text-center sm:text-left">
                                    <RiDoubleQuotesL className=" text-[25px] text-red-600 sm:hidden text-center w-full mb-3" />
                                    <p><span><RiDoubleQuotesL className=" text-[25px] text-red-600 hidden sm:block" /></span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia veniam odit nisi omnis numquam odio molestiae</p>
                                </div>
                                <div className="flex flex-col justify-center items-center sm:items-start">
                                    <h1 className=" text-[20px] font-semibold">Catherine Pitt</h1>
                                    <p className=" text-[13px]">Web Devloper</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default Testimonials;