import  express  from "express";
import { upload } from "../multerupload/upload.js";
import { petaddController,
    getAllPetsController,
    deletePetController,
    updatePetController,
    getPetByIdController,
    getAllDogsController, 
    getAllCatsController,
    getAllCowsController,
    getAllBirdsController,
    getAllFishController,
    getAllReptilesController,
    addToCartController,
    } from "../controller/petController.js";

 import { orderConfirmationController } from "../controller/orderController.js";
const router = express.Router()

router.post('/uploads',upload.single('image'),petaddController)
router.get('/pets',getAllPetsController)
router.get('/pets/dogs',getAllDogsController);
router.get('/pets/cats',getAllCatsController);
router.get('/pets/cows',getAllCowsController)
router.get('/pets/birds',getAllBirdsController)
router.get('/pets/fishes',getAllFishController)
router.get('/pets/reptiles',getAllReptilesController)
router.get('/pets/:id', getPetByIdController); 
router.delete('/delete-pet/:id', deletePetController);
router.put('/update-pet/:id',upload.single('image'),updatePetController)
router.post('/add-to-cart', addToCartController);
router.post('/confirm-order',orderConfirmationController);



export default router;