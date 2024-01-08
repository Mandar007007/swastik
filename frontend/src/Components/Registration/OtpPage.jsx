import { useRef, useState } from "react"
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar";

function OtpPage(params) {

    const navigate = useNavigate();
    const [otp, setOtp] = useState();

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 py-8">
                <form method="POST">
                    <div className=" max-w-[450px] max-h-[1100px] mx-auto bg-white shadow-xl py-8 px-10 flex flex-col items-center justify-center">
                        <div className="UserInput">
                            <div className="flex flex-col justify-center">
                                <h1 className=" text-center mb-3 text-[30px] font-semibold">Enter OTP</h1>
                                <h1 className=" text-center mb-3 text-[16px]">We have sent a verification code to <br /> your Email ID</h1>
                            </div>

                            <div className=" mt-3 mb-6">
                                <OtpInput
                                    inputStyle={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        margin: '10px 0.5rem',
                                        fontSize: '1rem',
                                        borderRadius: 4,
                                        border: '2px solid rgba(0,0,0,0.3)',
                                    }}
                                    inputType="tel"
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                        </div>

                        <button type="button" className="text-white bg-gradient-to-br rounded-md from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium text-sm px-8 py-2 text-center">
                            Confirm
                        </button>

                        <div className="flex flex-col items-center justify-center mt-7">
                            <h1 className=" text-center mb-2 text-[16px]">Don't receive the code?</h1>
                            <button type="button" className="rounded-md text-red-500 hover:text-red-800 flex items-center">Resend Code</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}

export default OtpPage

