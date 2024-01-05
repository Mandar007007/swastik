import { useEffect, useState } from "react"
import { useSelector } from "react-redux";


const Index = () => {
    const { user } = useSelector((state) => state.user);
    
    useEffect(() => {

    })
  return (
    <>
    hello {user && user.name} from swastik
    </>
  )
}

export default Index
