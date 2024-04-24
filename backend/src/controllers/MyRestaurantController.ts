import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

// Controller function to create a restaurant entry for a user
const createMyRestaurant = async (req: Request, res: Response) => {
	try {
		// Check for existing restaurant and handle image upload
		const existingRestaurant = await Restaurant.findOne({
			user: req.userId,
		});
		if (existingRestaurant) {
			return res
				.status(409)
				.json({ message: 'User Restaurant Already Exists' });
		}

		const image = req.file as Express.Multer.File;
		const base64Image = Buffer.from(image.buffer).toString('base64');
		const dataURI = `data:${image.mimetype};base64,${base64Image}`;
		const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

		// Create new restaurant document and save to database
		const restaurant = new Restaurant(req.body);
		restaurant.imageUrl = uploadResponse.url;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		restaurant.lastUpdated = new Date();
		await restaurant.save();

		res.status(201).send(restaurant);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error Creating Restaurant' });
	}
};

export default {
	createMyRestaurant,
};