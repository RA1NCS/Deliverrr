"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
// User fetch route; the token is parsed to extract user details, followed by data validation before the get operation is performed.
const router = express_1.default.Router();
router.get('/', auth_1.jwtCheck, auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
// User creation route; authentication is verified before allowing access to the controller.
router.post('/', auth_1.jwtCheck, MyUserController_1.default.createCurrentUser);
// User update route; after authentication, the token is parsed to extract user details, followed by data validation before the update operation is performed.
router.put('/', auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, MyUserController_1.default.updateCurrentUser);
exports.default = router;
