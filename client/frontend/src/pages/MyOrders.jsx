import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import myOrdersCss from './css/MyOders.module.css'


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(['access_token', 'userID']);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/${cookies.userID}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [cookies.userID]);

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
      <h2 className={myOrdersCss.head}>Your Orders</h2>
      
      {orders.length === 0 && <p style={{textAlign:"center",fontSize:"40px",marginTop:"150px",fontWeight:"600"}}>You Din't Order Anything...🙁</p>}
      {orders.map((order) => (
        <div key={order._id} className={myOrdersCss.orderbox}>
          <div className={myOrdersCss.orderdetails}>
            <p>Order Date: <span>{new Date(order.orderDate).toLocaleDateString()}</span></p>
            <p>Total Price: <span>₹{order.totalPrice}</span></p>
            <button className={myOrdersCss.btn} onClick={() => handleDeleteOrder(order._id)}>Cancel Order</button>
          </div>
          <div className={myOrdersCss.petimage}>
            {order.pets.map((petOrder) => (
               <div style={{display:"flex"}}>
                 <div style={{marginLeft:"50px",marginRight:"150px"}}>
                 <p>Pet: <span>{petOrder.pet.name}</span></p>
                <p>Quantity:<span> {petOrder.quantity}</span></p>
                <p>Price: <span>₹{petOrder.pet.price}</span></p>
                 </div>
                 <img key={petOrder.pet._id} src={`http://localhost:8000/${petOrder.pet.image}`} alt={petOrder.pet.name} />
               </div>
              
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
