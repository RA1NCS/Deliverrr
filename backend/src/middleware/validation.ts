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
