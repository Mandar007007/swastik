import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { MdCloudUpload } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { LuFileAudio2 } from "react-icons/lu";
import { IoMicCircleOutline } from "react-icons/io5";
import { Bars } from "react-loader-spinner";
import Avatar from "react-avatar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

function Upload_items(props) {

    const [pdf_file, setPdfFile] = useState(null);
    const [audio_file, setAudioFile] = useState();
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        console.log(props)
    })

    const handlePdfFileChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    }

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        setAudioFile(file);
        console.log(file);
    }

    const startSpeaking = async () => {
        try{
            setIsSpeaking(!isSpeaking)

            const response = await axios.post("http://127.0.0.1:8080/api/process_audio",{},{
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                withCredentials:true
            })
            
            console.log(response)
            
        }catch(err)
        {
            console.error(err);
        }
    }

    const stopSpeaking = async () => {
        setIsSpeaking(!isSpeaking)
        const response = await axios.post("http://localhost:8080/api/stop_listening",{},{
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            withCredentials:true
        })
    }


    const handleSubmit = async () => {
        try {
            const sendPdf = async () => {
                try {
                    const formData = new FormData();
                    formData.append('file', pdf_file);
                    formData.append('title',props.title)
                    formData.append('description',props.description)
                    formData.append('category',props.category)

                    return await axios.post("http://localhost:5000/api/data/pdf", formData, {
                        headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' },
                        withCredentials: true
                    });
                } catch (e) {
                    console.log(e);
                    throw e; // rethrow the error so that the promise is rejected
                }
            };
            toast.promise(
                sendPdf(),
                {
                    pending: {
                        render() {
                            return (
                                <div className="flex items-center">
                                  <Bars height={20} width={30} color="#4F46E5" />
                                  <span className="ml-2">Uploading...</span>
                                </div>
                              );
                        },
                        icon: false,
                    },
                    success: {
                        render({ data }) {
                            return (
                                <div className="flex items-center">
                                  <FaFilePdf
                                    className="text-green-500 mr-2 animate__animated animate__rubberBand"
                                    size={20}
                                  />
                                  <span>File successfully uploaded!</span>
                                </div>
                              );
                        },
                        
                        
                    },
                    error: {
                        render({ data }) {
                            // When the promise rejects, data will contain the error
                            return `Error: ${data.response.data.error}`;
                        },
                    },
                }
            );
    
        } catch (err) {
            console.log(err);
        }
    }

    if (props.type == 'audio') {
        return (
            <div className="">
                
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-sm cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                    {audio_file ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaFilePdf className=" text-[40px] text-gray-500 mb-6" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">File: </span>{audio_file.name}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <MdCloudUpload className=" text-[50px] text-gray-500 mb-2" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Audio File (max. size 1 MB)</p>
                        </div>
                    )}

                    <input type="file" onChange={handleAudioFileChange} className="hidden" />
                </label>
                <div className=" flex items-center justify-center">
                    <button onClick={handleSubmit} type="button" className=" mt-5 outline outline-blue-600 px-2 py-1 rounded-sm text-blue-400 hover:bg-blue-600 hover:text-white ">Submitaa</button>
                </div>
            </div>
        );
    }
    if (props.type == 'speech') {
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
                                wrapperclass=""
                                visible={true}
                            />
                        <div className="">
                            <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={stopSpeaking} >Stop</button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={startSpeaking} >Start</button>
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
                <button onClick={handleSubmit} type="button" className=" mt-5 outline outline-blue-600 px-2 py-1 rounded-sm text-blue-400 hover:bg-blue-600 hover:text-white ">Submitab</button>
            </div>
        </div>
    );
}

function UploadFiles() {

    const inputRef = useRef(null);
    const [image, setImage] = useState();
    const [title, setTitle] = useState('title')
    const [Description,setDescription] = useState('descript')
    const [category,setCategory] = useState('Lecture')

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
                        <button type="button" class=" mt-5 outline outline-gary-600 px-2 py-1 rounded-md text-slate-400 hover:bg-slate-400 hover:text-white ">Upload Event Logo</button>
                    </div>


                    <div className=" grid grid-cols-4 items-center mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Title</label>
                        </div>
                        <div className=" col-span-3">
                            <input onChange={(e) => setTitle(e.target.value)}type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your title" />
                        </div>
                    </div>

                    <div className=" grid grid-cols-4 mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Description</label>
                        </div>
                        <div className=" col-span-3">
                            <textarea id="message" rows="4" onChange={(e) => setDescription(e.target.value) } class="w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                    </div>

                    <div className=" grid grid-cols-4 items-center mb-5">
                        <div className=" col-span-1">
                            <label for="input-group-1" class="text-[16px] font-medium dark:text-white">Category</label>
                        </div>
                        <div className=" col-span-3">
                            <select onChange={(e) => setCategory(e.target.value)} id="default" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                className="hidden peer"
                            />
                            <label htmlFor="pdf_file" className="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/pdf.png" size="50px" />
                                <div className=" ml-4">
                                    <div className="w-full text-lg font-semibold">PDF</div>
                                    <div className="w-full text-sm">Upload Pdf File</div>
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
                                className="hidden peer"
                            />
                            <label htmlFor="audio_file" className="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/music1.png" size="50px" />
                                <div className=" ml-4">
                                    <div className="w-full text-lg font-semibold">Audio</div>
                                    <div className="w-full text-sm">Upload Audio File</div>
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
                                className="hidden peer"
                            />
                            <label htmlFor="speech_to_text" className="inline-flex items-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-sm cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <Avatar src="./src/assets/microphone.png" size="50px" />
                                <div className=" ml-4">
                                    <div className="w-full text-lg font-semibold">Speech to Text</div>
                                    <div className="w-full text-sm">Upload by Speaking</div>
                                </div>
                            </label>
                        </li>
                    </ul>

                    <div className="mt-8">
                       <Upload_items type={uploadType} title={title} description={Description} category={category} />
                    </div>
                </div>
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
            </div >
        </>
    );
}

export default UploadFiles;