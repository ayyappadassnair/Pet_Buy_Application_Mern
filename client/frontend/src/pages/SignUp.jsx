import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import signupCss from './css/SignUp.module.css';
import { IoMdEyeOff,IoMdEye } from "react-icons/io";
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate()

  const [showPassword,setShowPassword] = useState(false)
  const [showPassword2,setShowPassword2] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  const handleSubmit = async(e) => {
    e.preventDefault()

    const emptyFields = Object.values(formData).some((value) => value === '');

  if (emptyFields) {
    toast('All fields are required. Please fill in all the fields.');
    return;
  }
    try{
      if(formData.password !== formData.confirmPassword){
        toast("Passwords didn't match")
      }else{
        const url = "http://localhost:8000/register"
        const response = await axios.post(url,formData)
        if(response.data.status === false){
          toast("Email already registered")
        }else{
          toast("Registered Successfully")
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: '',
          });
          navigate('/signin')
        }
        
      }
      
    }catch(err){
      console.log(err)
    }
  };

  return (
    <>
      <Container>
        <h1 className={signupCss.head}>Sign Up...!</h1>
        <Row>
          <Col lg={12}>
            <div className="d-flex flex-column w-50 mx-auto">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                name="address"
                placeholder="Enter Your Address"
                id="address"
                cols="30"
                rows="5"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
             <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className={signupCss.eyeIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              <input
                type={showPassword2 ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className={signupCss.eyeIcon2} onClick={handleTogglePasswordVisibility2}>
                {showPassword2 ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              <button className={signupCss.button} onClick={handleSubmit}>
                Sign up
              </button>
              <div className='mt-4'>
                <p>Alreadt have an account?<Link to='/signin'>login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      theme="dark"
      />
    </>
  );
};

export default SignUp;
