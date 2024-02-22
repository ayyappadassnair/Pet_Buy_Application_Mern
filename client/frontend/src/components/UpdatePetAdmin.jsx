import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import updateCss from '../pages/css/UpdatePetAdmin.module.css'
import {toast,ToastContainer} from 'react-toastify'

const UpdatePetAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedPet, setUpdatedPet] = useState({
    name: '',
    desc: '',
    price: 0,
    category: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/pets/${id}`)
      .then((res) => {
        setUpdatedPet({
          name: res.data.data.name,
          desc: res.data.data.desc,
          price: res.data.data.price,
          category: res.data.data.category,
          image: null
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedPet({ ...updatedPet, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUpdatedPet({ ...updatedPet, image: e.target.files[0] });
  };

  const handleUpdatePet = async () => {
    const formData = new FormData();
    formData.append('name', updatedPet.name);
    formData.append('desc', updatedPet.desc);
    formData.append('price', updatedPet.price.toString());
    formData.append('category', updatedPet.category);
    if (updatedPet.image instanceof File) {
      formData.append('image', updatedPet.image);
    }

    try {
      const response = await axios.put(`http://localhost:8000/update-pet/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });

      console.log(response.data); 
      
    toast(response.data.message);
    if(response.data.message === "Pet updated successfully"){
      navigate('/admin');
    }
  
  
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="dark" />
      <h1 className={updateCss.head}>Update Pet</h1>
      <Container>
        <Row>
          <Col>
          <form onSubmit={handleUpdatePet} encType='multipart/form-data'>
          <div className="d-flex flex-column w-50 mx-auto">
        <label>Name:</label>
        <input type="text" name="name" value={updatedPet.name} onChange={handleInputChange} />

        <label>Description:</label>
        <textarea name="desc" value={updatedPet.desc} onChange={handleInputChange} />

        <label>Price:</label>
        <input type="number" name="price" value={updatedPet.price} onChange={handleInputChange} />

        <label>Category:</label>
        <select name="category" value={updatedPet.category} onChange={handleInputChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="cow">Cow</option>
          <option value="bird">Bird</option>
          <option value="fish">Fish</option>
          <option value="reptile">Reptile</option>
        </select>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />

        <button className={updateCss.button} type="submit">Update Pet</button>
        </div>
      </form>
      <Link to='/admin/viewpets'><button
       style={{backgroundColor:"red",color:"white",border:"none",padding:"5px 10px",fontWeight:"700",
       borderRadius:"10px",marginLeft:"22vw",marginTop:"10px",marginBottom:"30px"}}>View Pets</button></Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdatePetAdmin;
