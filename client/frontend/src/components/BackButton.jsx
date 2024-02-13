import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const BackButton = ({backpage}) => {
  return (
    <>
     <Link to={backpage}><button style={{color:"white",borderRadius:"50px",backgroundColor:"red",border:"none",padding:"5px 15px",marginLeft:"30px",fontSize:"20px"}}><IoMdArrowRoundBack /></button></Link>
    </>
  )
}

export default BackButton