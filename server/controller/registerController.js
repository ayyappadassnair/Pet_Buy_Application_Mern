import { userModel } from "../models/userModel.js"
import jwt from 'jsonwebtoken';
import { adminModel } from "../models/adminModel.js";
import { sendMail } from "../utilitis/sendEmail.js";


const registerController = async (req, res) => {
  const newuser = new userModel(req.body);
  try {
      const oldUser = await userModel.findOne({ email: req.body.email });
      if (oldUser) {
          res.json({ status: false, message: 'User already present' });
      } else {
          const response = await newuser.save();
          await sendMail(req.body.email,"welcome to Pet World...!",`Hi ${req.body.name} Thank You for registering`)
          res.json(response);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await adminModel.findOne({ email });

    if (adminUser && adminUser.password === password) {
      const adminToken = jwt.sign({ id: adminUser._id, email: adminUser.email }, process.env.ADMIN_JWT_TOKEN);
      res.json({ admin_access_token: adminToken });
    } else {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "User Doesn't Exist..!" });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: "Incorrect email or password." });
      }

      const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_TOKEN);
      res.json({ token, userID: user._id, user_name: user.name });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  

const getusers = async (req,res) => {
    try{
        const users = await userModel.find({})
        res.status(200).send({
            count:users.length,
            data:users
          })
    }catch(err){
        console.log(err)
        res.status(500).send({message:err.message})
    }
}

const deleteUser = async (req,res) => {
    try{
        const {id} = req.params;
        const result = await userModel.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).send({message:"user deleted successfully successfully"})

    }catch(err){
       console.log(err.message)
       res.status(500).send({message:err.message})
    }
}

const getUser = async(req,res) => {
    const id = req.params.id
    try {
        const user = await userModel.findById(id).select('name phone address');
        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const updateUser = async(req,res) => {
    try {
        const { name, phone, address } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.params.id,
          { name, phone, address },
          { new: true }
        );
        res.status(200).json("Updated Successfully");
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
const getCartController = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id).populate('cart');
        res.status(200).json({ cart: user.cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const removeFromCart = async (req, res) => {
    const { id, petId } = req.params;

    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cart.pull(petId);
        await user.save();

        res.json({ message: 'Pet removed from the cart successfully' });
    } catch (error) {
        console.error('Error removing pet from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { registerController,loginController,getusers,deleteUser,getUser,updateUser,getCartController,removeFromCart };