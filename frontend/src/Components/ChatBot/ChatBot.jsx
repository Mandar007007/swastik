import Avatar from "react-avatar";
import Navbar from "../Navbar/Navbar";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation"
import axios from "axios";
import { useSelector } from "react-redux";
import Comments from "../comments/Comments";
import Footer from "../Footer/Footer";

function Answer ({answer}) {
    return (
        <div className="answer mt-4">
            <div className=" bg-slate-100 mx-48 p-4 rounded-md flex shadow-md">
                <div className="">
                    <Avatar src="./src/assets/ai.jpg" round size="35px" />
                </div>
                <div className=" ml-4 w-full flex flex-col justify-between">
                    <h1 className=" text-lg font-semibold ">AI Assistent</h1>
                    <p className=" text-md">
                        <TypeAnimation
                            splitter={(str) => str.split(/(?= )/)}
                            sequence={[answer]}
                            speed={{ type: 'keyStrokeDelayInMs', value: 150 }}
                            cursor={false}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

function QnA ({qna}) {

    const [typingStatus, setTypingStatus] = useState(true);

    return (
        <>
        <div className="question mt-4">
            <div className=" bg-slate-100 mx-48 p-4 rounded-md flex shadow-md">
                <div className="">
                    <Avatar src="./src/assets/user7.png" round size="35px" />
                </div>
                <div className=" ml-4 w-full flex flex-col justify-between">
                    <h1 className=" text-lg font-semibold ">You</h1>
                    <p className=" text-md">
                        <TypeAnimation
                            
                            // splitter={(str) => str.split(/(?= )/)}
                            sequence={[
                                () => {
                                    setTypingStatus(true);
                                },
                                qna.myQuestion,
                                () => {
                                    setTypingStatus(false);
                                },
                            ]}
                            speed={30}
                            cursor={false}
                        />
                    </p>
                </div>
            </div>
        </div>

        {!typingStatus ? (
            <Answer answer={qna.myAnswer} /> 
        ) : ('')}

        </>
    );
}

let nextId = 0;

function ChatBot(params) {

    const [myQuestion, setMyQuestion] = useState('');
    const [myAnswer, setMyAnswer] = useState('');
    const [flag, setFlag] = useState(0);
    const [qnaArr, setQnaArr] = useState([]);
    const renderAfterCalled = useRef(false);
    const speechId = useSelector(state => state.user.speechId)

    const findAnswer = async () => {
        const response = await axios.post("http://localhost:5000/api/ask",{id:speechId,query:myQuestion},{
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })
        setMyAnswer(response.data.message)
        setFlag(flag + 1)
    }
    

    useEffect (() => {
        if (renderAfterCalled.current) {
            addQuestion();
        }
        renderAfterCalled.current = true;
    }, [flag]);

    const addQuestion = () => {
        if(myQuestion != ""){
            setQnaArr([
                ...qnaArr,
                { id: nextId++, myQuestion: myQuestion, myAnswer: myAnswer }
            ]);
        }
    }

    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
            <Navbar />
            <div className="">

                <div className="QnA pb-[7rem]">
                    {qnaArr.map((question) =>{
                        console.log(question)
                        return (
                            <div key={question.id} >
                                <QnA qna={question} />
                            </div>
                        );} )
                    }
                </div>                

                <div className=" fixed right-0 left-0 bottom-0 py-5 md:px-[100px] px-5 bg-gray-100 md:mx-32 mx-5 rounded-t-lg">
                    <div className=" flex items-center ">
                        <div className=" w-full mr-3">
                            <input
                                type="text" 
                                id="msg" 
                                className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark-500 dark:focus:border-dark-500" 
                                placeholder="Message AI..." 
                                required 
                                value={myQuestion}
                                onChange={e => setMyQuestion(e.target.value)}
                            />
                            <button type="submit" className="text-white absolute md:end-[160px] end-[80px] bottom-[1.80rem] bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-sm text-xl p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={findAnswer} ><FaArrowRight /></button>    
                        </div>
                        <div className=" "><Comments /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatBot;