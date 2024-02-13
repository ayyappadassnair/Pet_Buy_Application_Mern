import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { useCookies} from 'react-cookie';
import { toast,ToastContainer } from 'react-toastify';

const FishProduct = () => {
  const [fishes,setFishes] = useState([])
  const [cookies] = useCookies(['userID']);

  useEffect(() => {
    axios.get('http://localhost:8000/pets/fishes')
        .then(response => setFishes(response.data.data))
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
                    {fishes.map(fish => (
                        <Col key={fish._id} lg={4} style={{ marginBottom: "20px"}}>
                            <CardComponent
                                imgpath={`http://localhost:8000/${fish.image}`}
                                name={fish.name}
                                desc={fish.desc}
                                price={fish.price}
                                petId={fish._id}
                                onAddToCart={() => handleAddToCart(fish._id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

    </>
  )
}

export default FishProduct