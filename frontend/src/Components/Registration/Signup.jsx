import { useRef, useState } from "react"
import { FiUserCheck } from "react-icons/fi"
import { AiOutlineMail, AiOutlineLock, AiFillLock } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import Avatar from "react-avatar"
import Navbar from "../Navbar/Navbar"
import { ToastContainer, toast } from "react-toastify"
import { useDispatch } from "react-redux"
import axios from "axios"

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cpassword,setCpassword] = useState("");

    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => {
            return { ...prev, [name]: value };
        });

    };
    const handleSubmit = async () => {
        try {
            if(userData.password === cpassword){
            const response = await axios.post("http://localhost:3000/api/v1/register", userData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
        

            if (response.data.success) {
                dispatch({ type: "SET_TO_VERIFY", payload: userData.email });
                navigate('/otp')
            }
            }
            else{
                toast.error(`Invalid Input`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (e) {
            const mes = e.response.data.message || 'Invalid Input'
            toast.error(`${mes}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(e)
        }
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="bg-gray-100 py-8">
                <form method="POST">
                    <div className=" max-w-[800px] max-h-[1100px] sm:mx-auto mx-5 bg-white shadow-xl py-8 sm:px-20 px-10 sm:grid sm:grid-cols-7 grid-cols-1 justify-center">
                        <div className="profile grid col-start-1 col-end-4 sm:mr-10 justify-center">
                            <h1 className="sm:hidden text-center mb-5 text-[30px]">Register Here</h1>
                            <div className="flex flex-col items-center sm:my-auto mb-5">

                                <Avatar src="./src/assets/reg4.svg" size="275px" />

                            </div>
                        </div>
                        <div className="UserInput grid col-start-4 col-end-8 sm:ml-10">
                            <div className=" hidden sm:flex justify-center">
                                <h1 className=" text-center mb-6 text-[30px]">Register Here</h1>
                            </div>
                            <div className="inputFeild flex flex-col">
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <FiUserCheck className=" text-gray-600" />
                                    </div>
                                    <input type="text" onChange = {handleChange} name="name" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Username" />
                                </div>

                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <AiOutlineMail className=" text-gray-600" />
                                    </div>
                                    <input type="text" onChange = {handleChange} name="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Email" />
                                </div>

                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <AiOutlineLock className=" text-gray-600" />
                                    </div>
                                    <input name="password" onChange = {handleChange} type="password" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Password" />
                                </div>

                                <div className="relative mb-8">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <AiFillLock className=" text-gray-600" />
                                    </div>
                                    <input name="cpassword" onChange = {(e) => setCpassword(e.target.value)} type="password" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Confirm Password" />
                                </div>
                            </div>
                        </div>

                        <div className=" col-start-1 col-end-8">
                            <div className=" h-full flex items-center sm:justify-between justify-center">
                                <div className=" hidden sm:flex">
                                    <p>Already have an account ?</p>
                                    <Link className=" cursor-pointer rounded-md ml-2 text-red-500 hover:text-red-800 flex items-center" to="/signin">Login</Link>
                                </div>
                                <div className="">
                                    <button onClick={handleSubmit} type="button" className="text-white bg-gradient-to-br rounded-sm from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-4 py-2 text-center" >
                                        Get OTP
                                    </button>
                                </div>
                            </div>
                            <div className=" sm:hidden flex justify-center mt-5">
                                <p>Already have an account ?</p>
                                <Link className=" cursor-pointer rounded-md ml-2 text-red-500 hover:text-red-800 flex items-center" to="/signin">Login</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup

