import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { TypeAnimation } from 'react-type-animation';
import Typewriter from './TypeWriter';
import './index.css'


function App() {
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState('')



  const headers = {
    'Access-Control-Allow-Origin': '*', // This won't work on the client if the server doesn't allow it
    // Add other headers as needed
    'Content-Type': 'application/json', // Example content type
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Example authorization header
  };
  const audioInput = async () => {

    setisLoading(true)
    setData('');
    const response = await axios.post('http://localhost:8080/api/process_audio', {}, { headers })
    setData(response.data.message)
    console.log(response.data.message)
    setisLoading(false)

  }

  return (
    <>
      <div className='header'>
        <h1>Welcome To Swastik</h1>
      </div>
      <div className='main'>
        <Button
          isLoading={isLoading}
          colorScheme='blue'
          spinner={<BeatLoader size={8} color='white' />}
          onClick={audioInput}
          className='btn'
        >
          Click To Speak
        </Button>
        <div className='box'>
          <p>
            {/* <Typewriter text={data} delay={100} /> */}
            {data}
          </p>
        </div>
      </div>
    </>
  )
}

export default App
