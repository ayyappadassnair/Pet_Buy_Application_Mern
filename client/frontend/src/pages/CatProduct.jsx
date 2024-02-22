import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CardComponent from '../components/CardComponent'
import { Container,Row,Col } from 'react-bootstrap'
import { useCookies} from 'react-cookie';
import { toast,ToastContainer } from 'react-toastify';
import NavBar from '../components/NavBar'

const CatProduct = () => {

  const [cats,setCats] = useState([])
  const [cookies] = useCookies(['userID']);


  useEffect(()=>{
    axios.get('http://localhost:8000/pets/cats')
    .then((response)=> setCats(response.data.data))
    .catch((error)=> console.error("Error Fetching Cats:",error))
  }, [])

  const handleAddToCart = async (petId) => {
    try {
      const response = await axios.post('http://localhost:8000/add-to-cart', {
        userId: cookies.userID,
        petId: petId,
      });

      toast(response.data.message);
    } catch (error) {
      console.error('Error adding pet to cart:', error);
      toast('All Ready Present in the Cart');
    }
  };

  return (
    <>
        <NavBar/>
        <h1 style={{ color: "rgb(156,36,36)", padding: "15px", fontWeight: "bolder",textAlign:"center"}}>Find Your Pet...!</h1>
      <ToastContainer
             position="top-center"
             autoClose={2000}
             hideProgressBar
             theme="dark"
             />
      <Container>
        <Row>
          {cats.map((cat)=>(
            <Col key={cat._id} lg={4} style={{marginBottom:"20px"}}>
               <CardComponent
               imgpath={`http://localhost:8000/${cat.image}`}
               name={cat.name}
               desc={cat.desc}
               price={cat.price}
               petId={cat._id}
               onAddToCart={() => handleAddToCart(cat._id)}
               />
            </Col>
           ))}
        </Row>
      </Container>
    </>
  )
}

export default CatProduct