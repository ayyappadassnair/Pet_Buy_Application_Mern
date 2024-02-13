import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import signInCss from './css/SignIn.module.css';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [, setCookies] = useCookies('access_token');
  const [, setAdminCookies] = useCookies('admin_access_token');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        toast("Please enter your email address");
        return;
      }

      const response = await axios.post("http://localhost:8000/forgot-password", { email });

      toast(response.data.message);
    } catch (err) {
      console.error(err);
      toast("An error occurred. Please try again.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:8000/login", { email, password });

      if (response.data.token) {
        setCookies("access_token", response.data.token);
        setCookies('user_name', response.data.user_name);
        setCookies("userID", response.data.userID);
        window.localStorage.setItem("userID", response.data.userID);
        toast("Login Successful!");
        navigate('/');
      } else if (response.data.admin_access_token) {
        setAdminCookies("admin_access_token", response.data.admin_access_token);
        toast("Admin Login Successful!");
        navigate('/admin');
      } else {
        toast(response.data.message || "Login failed. Check your email and password.");
      }
    } catch (err) {
      console.error(err);
      toast("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="dark" />
      <Container style={{ marginTop: '100px' }}>
        <h1 className={signInCss.head}>Login Here...!</h1>
        <Row>
          <Col lg={12}>
            <div className="d-flex flex-column w-50 mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                required
                style={{ marginBottom: "20px" }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: "10px" }}
              />
              <div>
                <Link to="#" onClick={handleForgotPassword} style={{textDecoration:"none"}}><p style={{marginLeft:"33vw",marginBottom:"0"}}>forgot password?</p></Link>
              </div>
              <div className={signInCss.eyeIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              <button className={signInCss.button} onClick={handleSubmit}>
                Sign In
              </button>
              <div className='mt-4'>
                <p>Don't have an account?<Link to='/signup'>Signup</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;