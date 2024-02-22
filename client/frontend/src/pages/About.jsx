import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import {Container,Row,Col,Image} from 'react-bootstrap'
import PetImg from '../images/pet-care.jpg'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const About = () => {
  const [feedBack ,setFeedBack] =  useState("")

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
  return (
    <>
    <NavBar cart={cart}/>
     <h1 style={{color:"rgb(156,36,36)",fontWeight:"700",marginLeft:"60px",marginTop:"20px",marginBottom:"20px"}}>About Us</h1>
     <Container>
      <Row>
        <Col lg={6}>
          <Image src={PetImg} style={{width:"40vw",height:"50vh",border:"5px solid rgb(156,36,36)",borderRadius:"10px",marginLeft:"10px"}} />

          <div>
            <p style={{textAlign:"justify",marginTop:"15px"}}>
            Welcome to <span style={{color:"red",fontWeight:"600"}}>MyPets</span>, where your quest for the ideal four-legged companion is met with dedication and assurance. 
            At MyPets, our primary commitment is to unite passionate pet seekers with exceptional puppies and pets, ensuring a harmonious and 
            enduring bond. With a meticulous selection process, we collaborate solely with reputable breeders who prioritize the physical 
            and emotional well-being of their animals. Your journey begins with confidence as every pet you encounter on our platform 
             with a comprehensive health guarantee, a testament to our dedication to their prosperity.
            Each pet's profile on MyPets is a treasure trove of information, offering insights into their breed, temperament, and 
            any specific requirements they may have. Thorough veterinary examinations and vaccinations are non-negotiable standards, assuring 
            you that the newest member of your family is starting life on a foundation of good health. As you navigate the transparent adoption 
            process, you'll find clarity in the pet's background, vaccination records, and pertinent details.
            Join the MyPets community, where experienced and novice pet owners converge, sharing insights, tips, and support.
             Embrace the joy of adding a new family member with MyPets, where the pursuit of high-quality puppies and pets 
             intersects with a commitment to lifelong happiness. Welcome to a world filled with wagging tails, boundless love, and unforgettable
             companionship!
            </p>
          </div>
        
        </Col>
        <Col lg={6}>
          <h2 style={{marginLeft:"20px",fontWeight:"700"}}>Write Your Feedback..!</h2>
          <textarea
          style={{marginLeft:"20px",marginTop:"20px"}}
           name="" id="" cols="60" rows="10" value={feedBack} onChange={(e)=>setFeedBack(e.target.value)}></textarea>
          <div>
           <button
           style={{background:"rgb(156, 36, 36",width:"37vw",color:"white",border:"none",marginLeft:"20px",padding:"10px",marginTop:"15px",borderRadius:"10px"}}
           >Submit</button>
          </div>
        </Col>
      </Row>
     </Container>
     <Footer/>
    </>
  )
}

export default About