import express from "express";
const router = express.Router();
import { registerController,loginController, getusers, deleteUser, getUser, updateUser, getCartController, removeFromCart} from "../controller/registerController.js";
import { getOrdersForAdmin,deleteOrder, getMyOrders } from "../controller/orderController.js";
import { sendResetPasswordEmail,resetPassword } from "../controller/resetPasswordController.js";

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/users',getusers)
router.delete('/users/:id',deleteUser)
router.get('/user/:id',getUser)
router.put('/user/:id',updateUser)
router.get('/users/:id/cart', getCartController);
router.put('/users/:id/remove-from-cart/:petId', removeFromCart);
router.get('/admin/orders', getOrdersForAdmin);
router.delete('/admin/orders/:id', deleteOrder);
router.get('/orders/:userId',getMyOrders)
router.post('/forgot-password', sendResetPasswordEmail);
router.post('/reset-password/:token', resetPassword);

export default router