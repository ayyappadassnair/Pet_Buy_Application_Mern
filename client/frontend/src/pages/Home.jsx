import  { Suspense, lazy } from 'react'
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import dogwal3 from '../images/wal.webp'
import catwal from '../images/wal2.webp'
import birdwal from '../images/birdwal.webp'
import homeCss from './css/Home.module.css'
import Loading from '../components/Loading';
import CustomerStatification from './CustomerStatification';
import IntoVideo from '../components/IntoVideo';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useCookies } from 'react-cookie';
import axios from 'axios';


const Home = () => {

  const [cart, setCart] = useState([]);
 
  const [cookies] = useCookies(['userID']);
 

  useEffect(() => {

      const fetchCart = async () => {
          try {
              const response = await axios.get(`http://localhost:8000/users/${cookies.userID}/cart`);
              setCart(response.data.cart);
          } catch (error) {
              console.error('Error fetching user cart:', error);
          }
      };

      fetchCart();
  }, [cookies.userID]);

  const SubHome = lazy(()=>import('./SubHome'))
  return (
    <>
    <NavBar cart={cart}/>
  <Carousel >
      <Carousel.Item>
        <img src={dogwal3} text="First slide" alt='pic1' style={{width:"100%", height:"75vh"}} />
        <Carousel.Caption>
          <h3 className={homeCss.h3}>Welcome to the world of pets...!</h3>
          <p className={homeCss.p}>We believe in responsible pet ownership. Our application provides a wealth of resources, including expert tips, guides,
             and support to help you navigate the exciting journey of welcoming a new pet into your home</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={catwal} text="Second slide" alt='pic2' style={{width:"100%", height:"75vh"}} />
        <Carousel.Caption>
          <h3 className={homeCss.h3}>Discover Your Perfect Companion</h3>
          <p className={homeCss.p}>Ready to embark on the exciting adventure of finding your perfect pet? </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={birdwal} text="Third slide" alt='pic3' style={{width:"100%", height:"75vh"}}/>
        <Carousel.Caption>
          <h3 className={homeCss.h3}>Inclusive Pet Options</h3>
          <p className={homeCss.p}>
            Great Options,Offers are Here...!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
    <div>
      <Suspense fallback={<Loading/>}>
      <SubHome/>
      </Suspense>
    </div>
    <div>
    <IntoVideo/>
    </div>
    <div>
      <CustomerStatification/>
    </div>
    <Footer/>
    </>
    
  )
}

export default Home