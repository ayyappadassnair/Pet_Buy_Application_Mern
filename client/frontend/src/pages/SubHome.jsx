import React from 'react'
import {Container,Row,Col,Image} from 'react-bootstrap'
import doggy from '../images/doggy.jpg'
import cattty from '../images/cattty.jpg'
import cowy from '../images/cowy.jpg'
import birds from '../images/birds.jpg'
import fish from '../images/fish.jpg'
import Reptiles from '../images/Reptiles.jpg'
import { Link } from 'react-router-dom'
const SubHome = () => {
    const para = {
        marginLeft:"100px",
        marginTop:"10px",
        fontSize:"20px",
        fontWeight:"700"
    }
  return (
    <>
     <h1 className='mt-5 mb-5 text-black text-center' style={{fontFamily:"sans-serif",fontWeight:"600"}}>Select Your Pets</h1>
     <div>
     <Container className='mt-4 mb-4' style={{marginLeft:"90px"}}>
      <Row>
        <Col xs={12} md={4}>
          <Link to='/dogpage'><Image src={doggy} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}}/></Link>
          <p style={para}>Dogs</p>
        </Col>
        <Col xs={12} md={4}>
          <Link to='/catpage'><Image src={cattty} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}}/></Link>
          <p  style={para}>Cats</p>
        </Col>
        <Col xs={12} md={4}>
          <Link to='/cowpage'><Image src={cowy} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}}/></Link>
          <p  style={para}>Cows</p>
        </Col>
    </Row>
      <Row className='mt-4'>
        <Col xs={12} md={4}>
          <Link to='/birdspage'><Image src={birds} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}} /></Link>
          <p style={para}>Birds</p>
        </Col>
        <Col xs={12} md={4}>
          <Link to='/fishpage'><Image src={fish} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}}/></Link>
          <p style={para}>Fish</p>
        </Col>
        <Col xs={12} md={4}>
          <Link to='/reptilepage'><Image src={Reptiles} roundedCircle className='shadow-lg' style={{width:"20vw",height:"40vh"}}/></Link>
          <p style={para}>Reptiles</p>
        </Col>
    </Row>
    </Container>
     </div>
    </>
  )
}

export default SubHome