import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { MdOutlineDelete } from 'react-icons/md';
import { Button, Container } from 'react-bootstrap';
import ModalComponent from '../components/ModalComponent';
import { MdAddBox } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [, setAdminCookies] = useCookies('admin_access_token');

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/users")
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowConfirmation(true);
  };

  const confirmDeleteUser = () => {
    axios.delete(`http://localhost:8000/users/${userToDelete}`)
      .then((res) => {
        setUsers(users.filter(user => user._id !== userToDelete));
        setShowConfirmation(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelDeleteUser = () => {
    setUserToDelete(null);
    setShowConfirmation(false);
  };

  const logout = () => {
    setAdminCookies("admin_access_token", "");
    navigate('/signin');
  };

  return (
    <>
      <h1 className='mt-4 text-center mb-4 text-bold text-white bg-black py-2'>Admin Dashboard</h1>
      <Link to='/admin/viewpets'><button style={{backgroundColor:"red",color:"white",border:"none",padding:"5px 10px",fontWeight:"700",borderRadius:"10px",marginLeft:"7vw"}}>View Pets</button></Link>
      <Link to='/admin/orders'><button style={{backgroundColor:"black",color:"white",border:"none",padding:"5px 10px",fontWeight:"700",borderRadius:"10px",marginLeft:"20vw"}}>View Orders</button></Link>
      <Link style={{textDecoration:"none",marginLeft:"18vw",fontSize:"25px",color:"black",fontWeight:"700"}} to='/admin/addpet'>Add Pet<button style={{color:"red",fontSize:"40px",border:"none",marginBottom:"20px",backgroundColor:"white"}}><MdAddBox /></button></Link>
      <Button style={{marginLeft:"10vw"}} onClick={logout}>Logout</Button>
      <Container>
        <h1 style={{margin:"10px 0",fontWeight:"700"}}>User Details</h1>
      {loading ? <p>Loading..</p> :
        <Table className='shadow-lg'>
          <thead>
            <tr>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Index</th>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Name</th>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Email</th>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Phone</th>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Address</th>
              <th style={{background:"rgb(156,36,36)"}} className='text-white'>Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className='p-3 bg-white text-black'>{index + 1}</td>
                <td className='p-3 bg-white text-black'>{user.name}</td>
                <td className='p-3 bg-white text-black'>{user.email}</td>
                <td className='p-3 bg-white text-black'>{user.phone}</td>
                <td className='p-3 bg-white text-black'>{user.address}</td>
                <td className='p-3 bg-white'>
                  <MdOutlineDelete
                    className='text-danger'
                    onClick={() => handleDeleteUser(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }

      </Container>

     <ModalComponent showConfirmation={showConfirmation} cancelDeleteUser={cancelDeleteUser} 
     confirmDeleteUser={confirmDeleteUser} usecase="User"/>
    </>
  );
};

export default AdminPage;
