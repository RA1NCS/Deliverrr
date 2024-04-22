import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidationErrors = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

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
	handleValidationErrors,
];
