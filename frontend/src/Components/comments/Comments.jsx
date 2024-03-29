import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    SimpleGrid,
    Box,
    Text
  } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaMessage } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

function Comments() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const speechId = useSelector(state => state.user.speechId)
    const [comments,setComments] = useState([])

    const showComments = async () => {
        try{
            const response = await axios.post('http://localhost:5000/api/getComments',{speechId},{
                headers: {'Content-Type': 'application/json'},
                withCredentials:true
            })
            console.log(response)


            setComments(response.data.comments)

        }catch(err)
        {
            console.log(err.message)
        }
    }

    useEffect(() => {
        showComments()
    }, [onOpen])

    return (
      <>
        <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-sm text-xl p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onOpen}><FaMessage/></button>
  
          <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent className="mx-5">
              <ModalHeader>Comments</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {
                  <SimpleGrid columns={1} spacing={4} className='overflow-y-scroll h-[400px]'>
                  {comments.map((comment, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="lg">
                      <Text>{comment.commentText}</Text>
                    </Box>
                  ))}
                  </SimpleGrid>
                }
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Comment</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </>
    )
  }

  export default Comments;