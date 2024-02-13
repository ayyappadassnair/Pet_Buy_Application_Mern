import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col } from 'react-bootstrap';


const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        toast('All fields are required');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast('Passwords do not match');
        return;
      }

      const response = await axios.post(`http://localhost:8000/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      toast("Reset Successfully",response.data.message);
      navigate('/signin');
    } catch (err) {
      console.error(err);
      toast('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1 style={{color:"red",textAlign:"center",marginTop:"30px",marginBottom:"20px",fontWeight:"700"}}>Reset Password</h1>
      <Container>
        <Row>
          <Col>
          <div className="d-flex flex-column w-50 mx-auto">
          <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{borderRadius:"10px",marginBottom:"20px"}}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{borderRadius:"10px",marginBottom:"20px"}}
      />
    <button style={{border:"none",backgroundColor:"rgb(156, 36, 36)",color:"white",padding:"10px",borderRadius:"10px"}} onClick={handleResetPassword}>Reset Password</button>
      </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="dark" />
    </div>
  );
};

export default ResetPassword;

