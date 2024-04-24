import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware to handle validation errors in the request body
const handleValidationErrors = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Return a 400 error response if validation fails
		return res.status(400).json({ errors: errors.array() });
	}
	next(); // Proceed to the next middleware if no errors
};

// Define validation rules for user data in requests
export const validateMyUserRequest = [
	body('name').isString().notEmpty().withMessage('Name Must Be A String'),
	body('addressLine1')
		.isString()
		.notEmpty()
		.withMessage('Address Must Be A String'),
	body('city').isString().notEmpty().withMessage('City Must Be A String'),
	body('country')
		.isString()
		.notEmpty()
		.withMessage('Country Must Be A String'),
	handleValidationErrors, // Apply the custom error handling middleware to the validation chain
];

// Define validation rules for restaurant data in requests
export const ValidateMyRestaurantRequest = [
	body('restaurantName').notEmpty().withMessage('Restaurant Name Is Required'),
	body('city').notEmpty().withMessage('Restaurant City Is Required'),
	body('country').notEmpty().withMessage('Restaurant Country Is Required'),
	body('deliveryPrice')
		.isFloat({ min: 0 })
		.withMessage('Delivery Price Must Be A Positive Number'),
	body('deliveryTime')
		.isInt({ min: 0 })
		.withMessage('Estimated Delivery Time Must Be A Positive Number'),
	body('cuisines')
		.isArray()
		.withMessage('Cuisines Must Be An Array')
		.not()
		.isEmpty()
		.withMessage('Cuisines Array Cannot Be Empty'),
	body('menuItems').isArray().withMessage('Menu Items Must Be An Array'),
	body('menuItems.*.name')
		.notEmpty()
		.withMessage('Menu Item Name Is Required'),
	body('menuItems.*.price')
		.isFloat({ min: 0 })
		.withMessage(
			'Menu Item Price Is Required And Must Be A Positive Number'
		),
	handleValidationErrors, // Apply the custom error handling middleware to the validation chain
];
