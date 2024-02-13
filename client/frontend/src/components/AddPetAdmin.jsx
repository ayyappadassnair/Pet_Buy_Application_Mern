import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import addpetCss from '../pages/css/AddPetAdmin.module.css';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';

const AddPetAdmin = () => {
  const initialPetData = {
    name: '',
    desc: '',
    price: '',
    category: 'dog',
    image: null,
  };

  const [petData, setPetData] = useState(initialPetData);
  const [requiredFieldsError, setRequiredFieldsError] = useState('');

  const handleChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setPetData({
      ...petData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petData.name || !petData.desc || !petData.price || !petData.image) {
      setRequiredFieldsError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', petData.name);
    formData.append('desc', petData.desc);
    formData.append('price', petData.price);
    formData.append('category', petData.category);
    formData.append('image', petData.image);

    try {
      await axios.post('http://localhost:8000/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Pet Add Successfully');
      setTimeout(() => {
        setPetData(initialPetData);
      }, 100);
      setRequiredFieldsError('');
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <>
     <h1 className={addpetCss.head}>Add Pet Here...!</h1>
        <BackButton backpage="/admin"/>
      <Container>
        <Row>
          <Col lg={12}>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="d-flex flex-column w-50 mx-auto">
                <input type="text" name="name" placeholder='Enter Name Of the Breed' value={petData.name} onChange={handleChange} />
                <textarea name="desc" placeholder='Enter Description' value={petData.desc} onChange={handleChange} />
                <input type="text" name="price" placeholder='Enter Price' value={petData.price} onChange={handleChange} />
                <select name="category" value={petData.category} onChange={handleChange}>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="cow">Cow</option>
                  <option value="bird">Bird</option>
                  <option value="fish">Fish</option>
                  <option value="reptile">Reptile</option>
                </select>
                <label>Add Image</label>
                <input type="file" name="image" onChange={handleImageChange} />
                {requiredFieldsError && <p style={{ color: 'red' }}>{requiredFieldsError}</p>}
                <button className={addpetCss.addbtn} type="submit">Add Pet</button>
                
              </div>
              
            </form>
            <Link to='/admin/viewpets'><button style={{backgroundColor:"red",color:"white",border:"none",padding:"5px 10px",fontWeight:"700",borderRadius:"10px",marginLeft:"22vw",marginTop:"20px"}}>View Pets</button></Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddPetAdmin;
