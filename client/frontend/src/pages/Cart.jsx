import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';
import { Container, Row, Col} from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import NavBar from '../components/NavBar'


const Cart = () => {
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



  const handleRemoveFromCart = async (petId) => {
      try {
          await axios.put(`http://localhost:8000/users/${cookies.userID}/remove-from-cart/${petId}`);
           setCart(cart.filter((item) => item._id !== petId));
      } catch (error) {
          console.error('Error removing pet from cart:', error);
      }
  };

  const handleBuyNow = async (petId, quantity) => {
    try {
        const petIds = [petId];
        const pets = [{ pet: petId, quantity }]; 
        await axios.post('http://localhost:8000/confirm-order', {
            userId: cookies.userID,
            petIds,
            pets,
        });

        alert('Order confirmed successfully!');
        await axios.put(`http://localhost:8000/users/${cookies.userID}/remove-from-cart/${petId}`);
        setCart(cart.filter((item) => item._id !== petId));
    } catch (error) {
        console.error('Error confirming order:', error);
    }
};
  return (
      <>
      <NavBar cart={cart}/>
          <h1 style={{color:"red",fontWeight:"700",textAlign:"center",marginTop:"20px",marginBottom:"20px"}}> My Cart</h1>
        
          <Container>
              <Row>
                  {cart.map((item) => (
                      <Col key={item._id} lg={4} style={{ marginBottom: "20px" }}>
                          <CardComponent
                              imgpath={`http://localhost:8000/${item.image}`}
                              name={item.name}
                              desc={item.desc}
                              price={item.price}
                              petId={item._id}
                              onRemoveFromCart={() => handleRemoveFromCart(item._id)}
                              onAddToCart={(petId,quantity) => handleBuyNow(petId, quantity)}
                          />
                      </Col>
                  ))}

                  {cart.length === 0 && <p style={{textAlign:"center",fontSize:"40px",marginTop:"80px",fontWeight:"600"}}>Cart is Empty...🙁</p>}
              </Row>
          </Container>
          
      </>
  );
}

export default Cart;
