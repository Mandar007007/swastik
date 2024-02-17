import { useState } from "react";
import { IoPlaySharp } from "react-icons/io5"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import '@smastrom/react-rating/style.css'




function ModelCard(params) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openChatBot = async () => {
        try{
            dispatch({type:"SET_SPEECH",payload:params.params.id})
            navigate('/chatbot')

        }catch(e)
        {
            console.log(e.message)
        }
    }
    return (
        <>
            
            <div className="">
                <div className=" relative flex flex-col items-center lg:h-72 lg:w-[22.5rem] md:w-[20rem] w-[18rem] bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl duration-200 dark:border-gray-700 dark:bg-gray-800">
                    <div onClick={openChatBot} className=" absolute flex justify-center items-center right-5 md:top-[6.8rem] top-[7rem] bg-white md:h-[4.5rem] h-16 md:w-[4.5rem] w-16 border-4 rounded-full cursor-pointer hover:shadow-md duration-300 hover:shadow-sky-200 " ><IoPlaySharp className=" text-2xl" /></div>
                    <img className=" object-fill w-full rounded-t-lg h-36" src="./src/assets/bg6.png" alt="" />
                    <div className="flex flex-col p-4 leading-normal">
                    
                        <Rating

                            style={{ maxWidth: 75 }}
                            value={2.5}
                            readOnly
                        />
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">{params.params.title}</h5>
                        <p className=" font-normal text-gray-700 dark:text-gray-400">{params.params.description}</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModelCard;