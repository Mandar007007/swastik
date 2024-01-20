import { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { MdCloudUpload } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { LuFileAudio2 } from "react-icons/lu";
import { IoMicCircleOutline } from "react-icons/io5";
import { Bars } from "react-loader-spinner";
import Avatar from "react-avatar";

function Upload_items({ type }) {

    const [pdf_file, setPdfFile] = useState();
    const [audio_file, setAudioFile] = useState();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handlePdfFileChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
        console.log(file);
    }

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        setAudioFile(file);
        console.log(file);
    }

    if (type == 'audio') {
        return (
            <div className="">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                    {audio_file ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaFilePdf className=" text-[40px] text-gray-500 mb-6" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">File: </span>{audio_file.name}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <MdCloudUpload className=" text-[50px] text-gray-500 mb-2" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Audio File (max. size 1 MB)</p>
                        </div>
                    )}

                    <input type="file" onChange={handleAudioFileChange} class="hidden" />
                </label>
                <div className=" flex items-center justify-center">
                    <button type="button" className=" mt-5 outline outline-blue-600 px-2 py-1 rounded-sm text-blue-400 hover:bg-blue-600 hover:text-white ">Submit</button>
                </div>
            </div>
        );
    }
    if (type == 'speech') {
        return (
            <div className="flex items-center justify-center w-full mt-12">
                {isSpeaking ? (
                    <div className=" flex items-center justify-between w-full px-5">
                            <Bars
                                height="40"
                                width="80"
                                color="rgb(156 163 175)"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        <div className="">
                            <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setIsSpeaking(!isSpeaking)} >Stop</button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setIsSpeaking(!isSpeaking)} >Start</button>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                {pdf_file ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFilePdf className=" text-[40px] text-gray-500 mb-6" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">File: </span>{pdf_file.name}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <MdCloudUpload className=" text-[50px] text-gray-500 mb-2" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF File (max. size 1 MB)</p>
                    </div>
                )}
                <input type="file" onChange={handlePdfFileChange} class="hidden" />
            </label>
            <div className=" flex items-center justify-center">
                <button type="button" className=" mt-5 outline outline-blue-600 px-2 py-1 rounded-sm text-blue-400 hover:bg-blue-600 hover:text-white ">Submit</button>
            </div>
        </div>
    );
}

function Upload_pdf(params) {

    const inputRef = useRef(null);
    const [image, setImage] = useState();

    const handleImageClick = () => {
        inputRef.current?.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const [uploadType, setUploadType] = useState('pdf');

    return (
        <>
            <Navbar />
            <div className=" grid grid-cols-12 py-4 px-8">
                <div className=" col-span-4 row-span-3 bg-gray-100 rounded-sm py-5 px-4">

                    <div className=" flex flex-col items-center sm:mb-6 mb-10">
                        <div onClick={handleImageClick}>
                            {image ? (
                                <img src={URL.createObjectURL(image)} height={150} width={150} />
                            ) : (
                                <img src="./src/assets/pick.png" height={150} width={150} />
                            )}
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <button type="button" className=" mt-5 outline outline-gary-600 px-2 py-1 rounded-md text-slate-400 hover:bg-slate-400 hover:text-white ">Upload Event Logo</button>
                    </div>


                    <div className=" grid grid-cols-4 items-center mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Title</label>
                        </div>
                        <div className=" col-span-3">
                            <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your title" />
                        </div>
                    </div>

                    <div className=" grid grid-cols-4 mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Description</label>
                        </div>
                        <div className=" col-span-3">
                            <textarea id="message" rows="4" class="w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                    </div>

                    <div className=" grid grid-cols-4 items-center mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Category</label>
                        </div>
                        <div className=" col-span-3">
                            <select id="default" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Lecture" selected>Lecture</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Artical">Artical</option>
                                <option value="Book">Book</option>
                            </select>
                        </div>
                    </div>
                    <div className=" grid grid-cols-4 items-center mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Tags</label>
                        </div>
                        <div className=" col-span-3">
                            <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter tags" />
                        </div>
                    </div>

                </div>

                <div className=" col-span-8 ml-8 ">
                    <ul class="grid w-full gap-6 grid-cols-3">
                        <li>
                            <input
                                type="radio"
                                id="pdf_file"
                                name="uploadType"
                                value="pdf"
                                checked={uploadType === "pdf"}
                                onChange={() => { setUploadType('pdf') }}
                                class="hidden peer"
                            />
                            <label for="pdf_file" class="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/pdf.png" size="50px" />
                                <div class=" ml-4">
                                    <div class="w-full text-lg font-semibold">PDF</div>
                                    <div class="w-full text-sm">Upload Pdf File</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="audio_file"
                                name="uploadType"
                                value="audio"
                                checked={uploadType === "audio"}
                                onChange={() => { setUploadType('audio') }}
                                class="hidden peer"
                            />
                            <label for="audio_file" class="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/music1.png" size="50px" />
                                <div class=" ml-4">
                                    <div class="w-full text-lg font-semibold">Audio</div>
                                    <div class="w-full text-sm">Upload Audio File</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="speech_to_text"
                                name="uploadType"
                                value="speech"
                                checked={uploadType === "speech"}
                                onChange={() => { setUploadType('speech') }}
                                class="hidden peer"
                            />
                            <label for="speech_to_text" class="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/microphone.png" size="50px" />
                                <div class=" ml-4">
                                    <div class="w-full text-lg font-semibold">Speech to Text</div>
                                    <div class="w-full text-sm">Upload by Speaking</div>
                                </div>
                            </label>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <Upload_items type={uploadType} />
                    </div>
                </div>
            </div >
        </>
    );
}

export default Upload_pdf;