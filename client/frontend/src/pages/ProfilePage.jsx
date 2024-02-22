import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap'
import profileCss from '../pages/css/UpdatePetAdmin.module.css'
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const fetchProfileData = async () => {
    try {
      const userID = window.localStorage.getItem('userID');
      const response = await axios.get(`http://localhost:8000/user/${userID}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const userID = window.localStorage.getItem('userID');
      const response = await axios.put(`http://localhost:8000/user/${userID}`, profileData);
      toast(response.data);
     } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="dark" />
      <Container>
      <h2 className={profileCss.head}>Your Profile</h2>
        <Row>
          <Col lg={12}>
          <div className="d-flex flex-column w-50 mx-auto">
          <label>Name:</label>
        <input type="text" name="name" value={profileData.name} onChange={handleChange} />
      
      <label>Phone:</label>
        <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} />
      
      <label>Address:</label>
        <textarea name="address" value={profileData.address} onChange={handleChange}></textarea>
      
      <button className={profileCss.button} onClick={handleUpdateProfile}>Update Profile</button>
          </div>
         
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
