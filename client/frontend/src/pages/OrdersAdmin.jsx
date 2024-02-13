import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin2Fill } from "react-icons/ri";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  const para = {
    color: "black",
    fontSize: "17px",
    fontWeight: "500",
    marginLeft: "10px"
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/orders');
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders.reverse());
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);

  const calculateTotalPrice = (pets) => {
    return pets.reduce((acc, pet) => {
      return acc + pet.quantity * pet.pet.price;
    }, 0);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Orders</h2>
      <table style={{ marginLeft: "20px" }}>
        <thead>
          <tr>
            <th className='bg-black text-danger' style={{ width: "45vw", padding: "20px" }}>User Details</th>
            <th className='bg-black text-danger' style={{ width: "30vw" }}>Pet Details</th>
            <th className='bg-black text-danger' style={{ width: "20vw" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td style={{ backgroundColor: "rgb(235, 241, 242)" }}>
                <p style={para}>User: {order.user.name}</p>
                <p style={para}>Email: {order.user.email}</p>
                <p style={para}>Address: {order.user.address}</p>
                <p style={para}>Phone: {order.user.phone}</p>
              </td>
              <td style={{ backgroundColor: "rgb(235, 241, 242)" }}>
                {order.pets.map((pet) => (
                  <div key={pet.pet._id}>
                    <img
                      src={`http://localhost:8000/${pet.pet.image}`}
                      alt={pet.pet.name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', marginLeft: "10px" }}
                    />
                    <p style={para}>Pet: {pet.pet.name}</p>
                    <p style={para}>Quantity: {pet.quantity}</p>
                    <p style={para}>Price: {pet.pet.price}</p>
                  </div>
                ))}
                <p style={para}>Total Price: {calculateTotalPrice(order.pets)}</p>
              </td>
              <td style={{ backgroundColor: "rgb(235, 241, 242)", padding: "20px" }}>
                <button onClick={() => handleDeleteOrder(order._id)} style={{ border: "none", backgroundColor: "rgb(235, 241, 242)" }}>
                  <RiDeleteBin2Fill style={{ fontSize: "25px", color: "red" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersAdmin;

