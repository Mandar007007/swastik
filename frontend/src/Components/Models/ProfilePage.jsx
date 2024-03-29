import Navbar from "../Navbar/Navbar";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function ProfilePage(params) {
    
    const modulesData = [1, 2, 3, 4, 5, 6, 7];

    useEffect(() => {
        initFlowbite();
    }, []);

    return(
        <>
            <Navbar />

            <div className=" pt-5 pb-12 md:px-12 px-5 bg-gray-50 h-full ">

                <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-7">
                    <div className=" col-span-1 bg-white rounded-md h-[175px] shadow-md ">
                        <div className=" flex items-center h-full md:px-8 px-5 ">
                            <img src="./src/assets/user1.png" className=" w-[120px] h-[120px] rounded-md " />
                            <div className="flex flex-col md:ml-8 ml-5 w-full h-full py-8 justify-between ">
                                <div className="">
                                    <h1 className=" text-xl font-semibold " >Name</h1>
                                    <p className=" text-md " >abc@gmail.com</p>
                                </div>
                                <button type="button" class="text-green-600 bg-green-100 hover:bg-green-200 focus:ring-2 focus:outline-none focus:ring-green-400 dark:focus:ring-green-800 font-medium rounded-sm text-sm px-5 py-2 text-center">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                    <div className=" col-span-1 bg-white rounded-md h-[175px] shadow-md  md:mt-0 mt-5 ">
                        <div className=" flex flex-col items-center w-full md:px-8 px-5 justify-between h-full py-8">
                            <img src="./src/assets/cloud-upload.png" className=" w-[75px] h-[75px] " />
                            <button type="button" class="text-blue-600 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">Upload New Module</button>
                        </div>
                    </div>
                </div>

                <div className=" grid md:grid-cols-7 grid-cols-1 md:gap-7 ">

                    <div className=" md:col-span-2 md:mt-8 mt-5 bg-white py-3 px-3 rounded-md shadow-md md:h-[350px] max-h-[350px] flex flex-col ">
                        <h1 className=" lg:text-[30px] text-[25px] font-semibold text-center mb-6 " > Upload Status </h1>
                        <div className=" grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 ">
                            <div className=" border-t py-2.5 flex flex-row items-center ">
                                <img src="./src/assets/globe.png" className="inline-block relative object-cover object-center w-10 h-10 rounded-md" />
                                <p className=" text-[15px] ml-2 " >Lectures<span className=" ml-2" >0</span> </p>
                            </div>
                            <div className=" border-t py-2.5 flex flex-row items-center ">
                                <img src="./src/assets/book.png" className="inline-block relative object-cover object-center w-10 h-10 rounded-md" />
                                <p className=" text-[15px] ml-2 " >Books<span className=" ml-2" >0</span> </p>
                            </div>
                            <div className=" border-t md:border-b-0 sm:border-b border-b-0 py-2.5 flex flex-row items-center ">
                                <img src="./src/assets/article.png" className="inline-block relative object-cover object-center w-10 h-10 rounded-md" />
                                <p className=" text-[15px] ml-2 " >Articles<span className=" ml-2" >0</span> </p>
                            </div>
                            <div className=" border-t border-b py-2.5 flex flex-row items-center ">
                                <img src="./src/assets/seminar.png" className="inline-block relative object-cover object-center w-10 h-10 rounded-md" />
                                <p className=" text-[15px] ml-2 " >Seminar<span className=" ml-2" >0</span> </p>
                            </div>
                        </div>
                    </div>

                    <div className=" md:col-span-5 md:mt-8 mt-5 bg-white py-3 px-5 rounded-md shadow-md h-[350px]">
                        <div className="">
                            <h1 className=" lg:text-[30px] text-[25px] font-semibold mb-3">Your Modules</h1>
                        </div>
                        <div className=" overflow-x-scroll md:no-scrollbar ">
                            <div className="flex flex-col min-w-[550px]">

                                <div className="">
                                    <div className=" grid grid-cols-8 " >
                                        <div className=" col-span-4 border-b border-blue-gray-50 py-3 md:px-6 px-3 ">
                                            <p className="block antialiased  font-sans text-[13px] font-bold uppercase text-blue-gray-400">Module Name</p>
                                        </div>
                                        <div className=" col-span-2 border-b border-blue-gray-50 py-3 md:px-6 px-3">
                                            <p className="block antialiased font-sans text-[13px] font-bold uppercase text-blue-gray-400">Category</p>
                                        </div>
                                        <div className=" col-span-2 border-b border-blue-gray-50 py-3 md:px-6 px-3">
                                            <p className="block antialiased font-sans text-[13px] font-bold uppercase text-blue-gray-400">Rating</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-y-scroll h-[220px] no-scrollbar " >    
                                    {modulesData.map(() => {
                                        return (
                                            <>
                                                <div className=" hover:bg-slate-100 grid grid-cols-8 " >
                                                    <div className=" col-span-4 py-3 md:px-6 px-3 border-b border-blue-gray-50">
                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Green Revolution</p>
                                                    </div>
                                                    <div className=" col-span-2 py-3 md:px-6 px-3 border-b border-blue-gray-50">
                                                        <p className="block antialiased font-sans text-xs font-normal text-blue-gray-600">Lecture</p>
                                                    </div>
                                                    <div className=" col-span-2 py-3 md:px-6 px-3 border-b border-blue-gray-50">
                                                        <div className="block antialiased font-sans text-xs font-normal text-blue-gray-600">
                                                            <Rating
                                                                style={{ maxWidth: 75 }}
                                                                value={2.5}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    );

}

export default ProfilePage;