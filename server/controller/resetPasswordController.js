import  jwt  from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { sendMail } from "../utilitis/sendEmail.js";


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: '1h' });
  };
  
  export const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = generateToken(user._id);
  
      await sendMail(email, 'Reset Password', `Click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`);
  
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
      const user = await userModel.findById(decodedToken.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };