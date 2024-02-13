import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pets: [
    {
      pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  
});

export const orderModel = mongoose.model('Order', orderSchema);
