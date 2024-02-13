import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import { petModel } from "../models/petModel.js";


const orderConfirmationController = async (req, res) => {
  try {
      const { userId, petIds, pets } = req.body;

      const user = await userModel.findById(userId);
      const petsFromDB = await petModel.find({ _id: { $in: petIds } });

      if (!user || !petsFromDB || petsFromDB.length !== petIds.length) {
          return res.status(404).json({ error: 'User or pets not found' });
      }

      let totalQuantity = 0;
      let totalPrice = 0;

      petIds.forEach((petId) => {
          const quantity = pets.find((pet) => pet.pet === petId).quantity;
          totalQuantity += quantity;

          const petTotalPrice = quantity * petsFromDB.find((pet) => pet._id.equals(petId)).price;
          totalPrice += petTotalPrice;
      });

      const newOrder = new orderModel({
          user: userId,
          pets: petIds.map((petId) => ({ pet: petId, quantity: pets.find((pet) => pet.pet === petId).quantity })),
          totalQuantity,
          totalPrice,
      });

      await newOrder.save();

      user.cart = user.cart.filter((petId) => !petIds.includes(petId));
      await user.save();

      res.json({ message: 'Order confirmed successfully' });
  } catch (error) {
      console.error('Error confirming order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersForAdmin = async (req, res) => {
    try {
      const orders = await orderModel.find().populate('user pets.pet');
      res.json({ data: orders });
    } catch (error) {
      console.error('Error fetching orders for admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      await orderModel.findByIdAndDelete(orderId);
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getMyOrders = async (req, res) => {
    try {
      const userId = req.params.userId;
      const userOrders = await orderModel.find({ user: userId }).populate('pets.pet');
  
      if (!userOrders) {
        return res.status(404).json({ error: 'User orders not found' });
      }
  
      res.json({ data: userOrders });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
 
  
export { orderConfirmationController,getOrdersForAdmin, deleteOrder,getMyOrders };
