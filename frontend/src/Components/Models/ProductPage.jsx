import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { initFlowbite } from "flowbite";
import ModelCard from "./ModelCard";
import { FaAngleDown } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import Avatar from "react-avatar";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './styles.css';

import { FreeMode, Mousewheel, Pagination } from 'swiper/modules';
import axios from "axios";
import Footer from "../Footer/Footer";

function ProductPage(params) {

    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState('All');
    const [width, setWidth] = useState(window.screen.width);
    const [slides, setSlides] = useState(3);
    const [booksItem, setBooksItem] = useState([]);

    const getSpeech = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/getspeech',{},{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            })

            const speeches = response.data.speeches.map((speech,index) => {
                return <ModelCard key={index} params={{title:speech.title,description:speech.description,id:speech._id}}/>
            })
            setBooksItem(speeches)

        }catch(e)
        {
            console.log("Error: " + e.message);
        }
    }

    useEffect(() => {
        initFlowbite();
    }, []);

    useEffect(() => {
        getSpeech()
    },[])
    useEffect(() => {
        if (isOpen)
            setIsOpen(!isOpen);
    }, [category]);

    const currentScreenWidth = () => {
        setWidth(() => window.innerWidth);
    } 

    useEffect(() => {
        window.addEventListener("resize", currentScreenWidth);
        if (width > 1145)
            setSlides(3);
        else if(width > 636)
            setSlides(2);
        else 
            setSlides(1);

        return(() => {
            window.removeEventListener("resize", currentScreenWidth);
        });
    });

    return (
        <>
            <Navbar />

            <div className="search-bar bg-gray-100 sm:py-8 py-6">

                <form>
                    <div className="flex sm:mx-24 mx-4">
                        <div className="">
                            <button className=" relative flex-shrink-0 inline-flex items-center md:py-3 md:ps-4 py-2 ps-2 text-sm sm:w-36 w-[5.5rem] font-medium text-center text-gray-900 bg-gray-50 border border-gray-300 rounded-s-sm hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {category}
                                <FaCaretDown className=" absolute md:end-2.5 end-1 text-lg" />
                            </button>
                            {isOpen ?
                                <div className=" absolute mt-3 z-20 bg-white divide-y divide-gray-100 rounded-sm shadow-md w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => setCategory('Lecture')}
                                            >Lecture</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => setCategory('Seminar')}
                                            >Seminar</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => setCategory('Article')}
                                            >Article</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                onClick={() => setCategory('Book')}
                                            >Book</button>
                                        </li>
                                    </ul>

                                </div>
                                : null}
                        </div>
                        <input type="search" className="block md:p-3 p-2 w-full text-sm text-gray-900 rounded-e-sm border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by Name, Creater,..." required />
                        <button type="submit" className="inline-flex items-center justify-center md:py-3 py-1 md:px-3 px-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-sm border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 sm:me-2 sm:mx-0 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg><span className=" sm:block hidden">Search</span>
                        </button>
                    </div>
                </form>

            </div>

            <div className="lectures-div mt-8">
                <h1 className=" flex items-center ms-3">
                    <Avatar src="./src/assets/globe.png" size="65px" />
                    <span className=" text-3xl ms-2">Lecture Modules</span>
                </h1>
                <div className="myProduct my-10 mx-8">
                    <Swiper
                        direction={'horizontal'}
                        slidesPerView={slides}
                        spaceBetween={10}
                        mousewheel={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Mousewheel, Pagination]}
                    >
                        {booksItem.map((slideContent, index) => (
                            <SwiperSlide key={index}>
                                {slideContent}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="books-div ">
                <h1 className=" flex items-center ms-3">
                    <Avatar src="./src/assets/book.png" size="65px" />
                    <span className=" text-3xl ms-2">Book Modules</span>
                </h1>
            </div>
            <div className="article-div ">
                <h1 className=" flex items-center ms-3">
                    <Avatar src="./src/assets/article.png" size="65px" />
                    <span className=" text-3xl ms-2">Article Modules</span>
                </h1>
            </div>
            <div className="seminar-div ">
                <h1 className=" flex items-center ms-3">
                    <Avatar src="./src/assets/seminar.png" size="65px" />
                    <span className=" text-3xl ms-2">Seminar Modules</span>
                </h1>
            </div>

            <Footer />
        </>
    );
}

export default ProductPage;