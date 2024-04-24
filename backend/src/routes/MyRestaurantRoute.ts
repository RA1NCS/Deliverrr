import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { ValidateMyRestaurantRequest } from '../middleware/validation';

// Initialize the router object from Express
const router = express.Router();

// Configure multer for in-memory storage to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
	},
});

// Route to create a restaurant entry. This route chain includes several middlewares.
router.post(
	'/',
	ValidateMyRestaurantRequest,
	jwtCheck,
	jwtParse,
	upload.single('imageFile'),
	MyRestaurantController.createMyRestaurant
);

// Export the configured router
export default router;
