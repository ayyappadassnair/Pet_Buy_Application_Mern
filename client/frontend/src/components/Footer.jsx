import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import footerCss from '../pages/css/Footer.module.css'

const Footer = () => {


  return (
    <>
     <footer className='d-flex justify-content-between' style={{backgroundColor:"black",color:"white",padding:"20px"}}>
        <div style={{marginTop:"20px"}}>
            <p>copyrigt@myPets.com</p>
        </div>
        <div style={{display:"flex",gap:"10px" ,marginTop:"20px"}}>
        <FaInstagram className={footerCss.icon}/>
        <FaFacebookF className={footerCss.icon} />
        <FaXTwitter className={footerCss.icon} />
        <SiGmail className={footerCss.icon}/>
        </div>
     </footer>
    </>
  )
}

export default Footer