import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CardComponent({ imgpath, name, desc, price,petId, onAddToCart, onRemoveFromCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const selectedQuantity = parseInt(e.target.value, 10);
        setQuantity(selectedQuantity);
    };
    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Card style={{ width: '17rem', textAlign: 'center' }} className='shadow-lg'>
                        <Card.Img variant='top' src={imgpath} style={{ width: '100%', height: '30vh' }} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>{desc}</Card.Text>
                            <div className='d-flex justify-content-center gap-3'>
                                <Form.Label>Qty:</Form.Label>
                                <Form.Select
                                  style={{ width: '90px' }}
                                  onChange={ handleQuantityChange}  
                                   value={quantity}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                 <option key={value} value={String(value)}>
                                   {value}
                                </option>
                                  ))}
                                 </Form.Select>
                            </div>
                            <p style={{ color: 'red', fontWeight: 'bolder', fontSize: '20px' }}>₹.{price * quantity}</p>
                            {onAddToCart && (
                                <Button variant='primary'onClick={() => onAddToCart(petId,quantity)}>
                                    Buy NoW
                                </Button>
                            )}
                            {onRemoveFromCart && (
                                <Button variant='danger'style={{marginLeft:"10px"}} onClick={onRemoveFromCart}>
                                    Remove
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CardComponent;
