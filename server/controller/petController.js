import { petModel } from "../models/petModel.js";
import { userModel } from "../models/userModel.js"; 
import fs from 'fs';


const addToCartController = async (req, res) => {
  const { userId, petId } = req.body;

  try {
      const user = await userModel.findById(userId);
      const pet = await petModel.findById(petId);

      if (!user || !pet) {
          return res.status(404).json({ error: 'User or pet not found' });
      }
      if (!user.cart.includes(petId)) {
          user.cart.push(petId);
          await user.save();
          res.json({ message: 'Pet added to cart successfully' });
      } else {
          res.status(400).json({ error: 'Pet already in the cart' });
      }
  } catch (error) {
      console.error('Error adding pet to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const petaddController = async (req, res) => {
    const { name, desc, price, category } = req.body;

    try {
        const newPet = new petModel({
            name,
            desc,
            price,
            category,
            image: req.file.filename,
        });

        await newPet.save();
        res.json({ message: "Pet added successfully" });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllPetsController = async (req, res) => {
    try {
        const pets = await petModel.find();
        res.json({ data: pets });
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePetController = async (req, res) => {
    const petId = req.params.id;

    try {
        const pet = await petModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        const filePath = `uploads/${pet.image}`;

        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        await petModel.findByIdAndDelete(petId);

        res.json({ message: "Pet deleted successfully" });
    } catch (error) {
        console.error('Error deleting pet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPetByIdController = async (req, res) => {
    const petId = req.params.id;
  
    try {
      const pet = await petModel.findById(petId);
      res.json({ data: pet });
    } catch (error) {
      console.error('Error fetching pet details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updatePetController = async (req, res) => {
    const petId = req.params.id;
    const { name, desc, price, category } = req.body;
  
    try {
      const updatedPet = await petModel.findByIdAndUpdate(
        petId,
        { name, desc, price, category },
        { new: true }
      );
  
      if (req.file) {
        const filePath = `uploads/${updatedPet.image}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
  
        updatedPet.image = req.file.filename;
        await updatedPet.save();
      }
  
      res.json({ data: updatedPet, message: 'Pet updated successfully' });
    } catch (error) {
      console.error('Error updating pet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllDogsController = async (req, res) => {
    try {
        const dogs = await petModel.find({ category: 'dog' });
        res.json({ data: dogs });
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllCatsController = async (req,res) => {
  try{
    const cats = await petModel.find({category: 'cat'})
    res.json({data:cats})
  }catch(error){
    console.log("Error fetching Cats:", error)
    res.status(500).json({error:"Internal Server Error"})
  }
}
  
const getAllCowsController = async(req,res) => {
  try{
    const cows = await petModel.find({category: 'cow'})
    res.json({data:cows})
  }catch(error){
    console.log("Error Fetching Cows",error)
    res.status(500).json({error:"Internal  Server Error"})
  }
}
  
const getAllBirdsController = async(req,res) => {
  try{
    const cows = await petModel.find({category: 'bird'})
    res.json({data:cows})
  }catch(error){
    console.log("Error Fetching Cows",error)
    res.status(500).json({error:"Internal  Server Error"})
  }
}
  
const getAllFishController = async(req,res) => {
  try{
    const cows = await petModel.find({category: 'fish'})
    res.json({data:cows})
  }catch(error){
    console.log("Error Fetching Cows",error)
    res.status(500).json({error:"Internal  Server Error"})
  }
}
  
const getAllReptilesController = async(req,res) => {
  try{
    const cows = await petModel.find({category: 'reptile'})
    res.json({data:cows})
  }catch(error){
    console.log("Error Fetching Cows",error)
    res.status(500).json({error:"Internal  Server Error"})
  }
}
  
export { petaddController,getAllPetsController,
  deletePetController,getPetByIdController,
  updatePetController,getAllDogsController,
getAllCatsController,getAllCowsController,getAllBirdsController,getAllFishController,
getAllReptilesController,addToCartController};

