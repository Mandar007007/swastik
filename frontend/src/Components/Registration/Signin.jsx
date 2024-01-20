import { useRef, useState } from "react"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import { useNavigate, Link } from "react-router-dom"
import Avatar from "react-avatar"
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import './gola.css'
import 'react-toastify/dist/ReactToastify.css';

function Signin(params) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => {
            return { ...prev, [name]: value };
        });

    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/login", userData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })

            if (response.data.user) {
                if (response.data.user) {
                    dispatch({ type: "SET_USER", payload: response.data.user });
                } else {
                    dispatch({ type: "CLEAR_USER" });
                }
                navigate('/')
            }
        } catch (e) {
            toast.error(`${e.response.data.message}`, {
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="bg-gray-100 py-8 ">
                <form method="POST" className="">
                    <div className=" max-w-[800px] max-h-[1100px] sm:mx-auto mx-5 bg-white shadow-xl py-8 sm:px-20 px-10 sm:grid sm:grid-cols-7 grid-cols-1 justify-center">
                        <div className="profile grid col-start-1 col-end-4 sm:mr-10 justify-center">
                            <h1 className="sm:hidden text-center mb-5 text-[30px]">Welcome Back</h1>
                            <div className="flex flex-col items-center sm:my-auto mb-5">

                                <Avatar src="./src/assets/reg3.jpg" size="325px" />

                            </div>
                        </div>
                        <div className="UserInput grid col-start-4 col-end-8 sm:ml-10">
                            <div className=" hidden sm:flex justify-center">
                                <h1 className=" text-center mb-6 text-[30px]">Welcome Back</h1>
                            </div>
                            <div className="inputFeild flex flex-col">

                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <AiOutlineMail className=" text-gray-600" />
                                    </div>
                                    <input onChange={handleChange} name="email" type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Email" />
                                </div>

                                <div className="relative mb-3">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <AiOutlineLock className=" text-gray-600" />
                                    </div>
                                    <input onChange={handleChange} type="password" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-400 focus:border-red-400 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400" placeholder="Password" />
                                </div>

                                <div className="flex justify-end mb-6">
                                    <Link className=" cursor-pointer rounded-md ml-2 text-red-400 text-[14px] hover:text-red-700 flex items-center" to="/register">Forgot password?</Link>
                                </div>
                            </div>
                        </div>

                        <div className=" col-start-1 col-end-8">
                            <div className=" h-full flex items-center sm:justify-between justify-center">
                                <div className=" hidden sm:flex">
                                    <p>Don't have an account ?</p>
                                    <Link className=" cursor-pointer rounded-md ml-2 text-red-500 hover:text-red-800 flex items-center" to="/register" >Register</Link>
                                </div>
                                <div className="">
                                    <button onClick={handleSubmit} type="button" className="text-white bg-gradient-to-br rounded-sm from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-4 py-2 text-center">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className=" sm:hidden flex justify-center mt-5">
                                <p>Don't have an account ?</p>
                                <Link className=" cursor-pointer rounded-md ml-2 text-red-500 hover:text-red-800 flex items-center" to="/register" >Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signin

