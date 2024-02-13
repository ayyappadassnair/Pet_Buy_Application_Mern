import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { useCookies} from 'react-cookie';
import { toast,ToastContainer } from 'react-toastify';

const BirdsProduct = () => {
  const [birds,setBirds] = useState([])
  const [cookies] = useCookies(['userID']);

  useEffect(() => {
    axios.get('http://localhost:8000/pets/birds')
        .then(response => setBirds(response.data.data))
        .catch(error => console.error('Error fetching dogs:', error));
}, []);

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
      <h1 style={{ color: "red", backgroundColor: "black", padding: "15px", fontWeight: "bolder" }}>Find Your Pet...!</h1>
      <ToastContainer
             position="top-center"
             autoClose={2000}
             hideProgressBar
             theme="light"/>
            <Container>
                <Row>
                    {birds.map(bird => (
                        <Col key={bird._id} lg={4} style={{ marginBottom: "20px"}}>
                            <CardComponent
                                imgpath={`http://localhost:8000/${bird.image}`}
                                name={bird.name}
                                desc={bird.desc}
                                price={bird.price}
                                petId={bird._id}
                                onAddToCart={() => handleAddToCart(bird._id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
    </>
  )
}

export default BirdsProduct