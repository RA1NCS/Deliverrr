import express from 'express';
import MyUserController from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

// User fetch route; the token is parsed to extract user details, followed by data validation before the get operation is performed.
const router = express.Router();
router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser);

// User creation route; authentication is verified before allowing access to the controller.
router.post('/', jwtCheck, MyUserController.createCurrentUser);

// User update route; after authentication, the token is parsed to extract user details, followed by data validation before the update operation is performed.
router.put(
	'/',
	jwtCheck,
	jwtParse,
	validateMyUserRequest,
	MyUserController.updateCurrentUser
);

export default router;
