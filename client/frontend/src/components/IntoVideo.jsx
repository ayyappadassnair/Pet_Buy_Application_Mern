import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const IntoVideo = () => {
  return (
    <>
    <Container className='mt-4 mb-4'>
        <Row>
           <Col lg={7} md={12}>
           <iframe  style={{border:"10px solid red",borderRadius:"15px"}}width="600" height="377" src="https://www.youtube.com/embed/dYFVvcz2UB4" title="The power of pets: How animals affect human health" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
           </Col>
           <Col lg={5} md={12}>
            <h2 className='text-danger'>The Vital Role of Pets in Mental Health</h2>
            <p>Pets play a crucial role in promoting mental health and well-being, providing companionship and emotional support that can significantly impact an individual's overall happiness. The unconditional love and non-judgmental nature of pets create a unique bond that helps alleviate feelings of loneliness and isolation. Interacting with pets has been shown to reduce stress and anxiety levels, as the act of petting or 
                playing with them triggers the release of oxytocin, a hormone associated with bonding and stress reduction.</p>
           </Col>
        </Row>
    </Container>
    </>
  )
}

export default IntoVideo