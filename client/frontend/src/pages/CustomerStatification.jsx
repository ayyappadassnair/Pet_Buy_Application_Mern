import React from 'react';
import { Image } from 'react-bootstrap';
import cust from '../images/customer.jpg';

const CustomerSatisfaction = () => {
  const imageStyle = {
    width: '100%',
    height: '70vh',
    position: 'relative'
  };

  const gradientStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70vh',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  };

  const textStyle = {
    position: 'absolute',
    top: '10%',
    left: '5%', 
    color: 'white',
    textAlign: 'right',
    fontSize: '3rem',
    fontWeight: 'bold',
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image style={imageStyle} src={cust} />
        <div style={gradientStyle}></div>
        <div style={textStyle}>
          50,000+ Happy Customers...
        </div>
      </div>
    </>
  );
};

export default CustomerSatisfaction;
