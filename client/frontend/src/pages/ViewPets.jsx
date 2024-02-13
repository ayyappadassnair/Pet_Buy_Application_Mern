import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import ModalComponent from '../components/ModalComponent';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ViewPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/pets')
      .then((res) => {
        setPets(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const groupPetsByCategory = () => {
    const groupedPets = {};
    pets.forEach((pet) => {
      const category = pet.category;
      if (!groupedPets[category]) {
        groupedPets[category] = [];
      }
      groupedPets[category].push(pet);
    });
    return groupedPets;
  };

  const groupedPets = groupPetsByCategory();

  const handleDeleteButtonClick = (pet) => {
    setSelectedPet(pet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:8000/delete-pet/${selectedPet._id}`)
      .then(() => {
        setPets((prevPets) => prevPets.filter(pet => pet._id !== selectedPet._id));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <h1 className='mt-4 text-center mb-4 text-bold text-white bg-black py-2'>View Pets</h1>
      <BackButton backpage='/admin'/>
      <div className="container">
        {loading ? <p>Loading..</p> : (
          <>
            {Object.entries(groupedPets).map(([category, petsInCategory]) => (
              <div key={category}>
                <h2 className='text-black text-center mb-3' style={{fontSize:"30px",fontWeight:"700"}}>{category}</h2>
                <Table>
                  <thead>
                    <tr>
                      <th className='bg-danger text-white' style={{width:"50px"}}>Index</th>
                      <th className='bg-danger text-white' style={{width:"80px"}}>Name</th>
                      <th className='bg-danger text-white' style={{width:"130px"}}>Description</th>
                      <th className='bg-danger text-white' style={{width:"60px"}}>Category</th>
                      <th className='bg-danger text-white' style={{width:"60px"}}>Price</th>
                      <th className='bg-danger text-white' style={{width:"100px"}}>Image</th>
                      <th className='bg-danger text-white' style={{ width: "70px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {petsInCategory.map((pet, index) => (
                      <tr key={pet._id}>
                        <td className='p-3 bg-black text-white'>{index + 1}</td>
                        <td className='p-3 bg-black text-white'>{pet.name}</td>
                        <td className='p-3 bg-black text-white'>{pet.desc}</td>
                        <td className='p-3 bg-black text-white'>{pet.category}</td>
                        <td className='p-3 bg-black text-white'>{pet.price}</td>
                        <td className='p-3 bg-black text-white'>
                          <img src={`http://localhost:8000/${pet.image}`} alt={pet.name} style={{width:"40%",height:"60px",borderRadius:"10px" }} />
                        </td>
                        <td className='p-3 bg-black text-white'>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDeleteButtonClick(pet)}
                >
                  <MdDelete />
                </button>
                <Link to={`/admin/updatepet/${pet._id}`} className="btn btn-warning"><FaEdit /></Link>
                </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
            {Object.keys(groupedPets).length === 0 && (
              <>
              <h1 className='text-center mt-4'>Nothing to show, please Add</h1>
              <Link  style={{textDecoration:"none",color:"red",textAlign:"center",fontSize:"25px"}} to='/admin/addpet'>
                <p>Go to Add Pet<FaArrowRightLong style={{marginLeft:"5px"}}/></p></Link>
              </>
            )}
          </>
        )}
      </div>
      <ModalComponent cancelDeleteUser={handleDeleteModalClose}
       confirmDeleteUser={handleDeleteConfirm} showConfirmation={showDeleteModal} usecase="Pet"/>
    </>
  );
};

export default ViewPets;
