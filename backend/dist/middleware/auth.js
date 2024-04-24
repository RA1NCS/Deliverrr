"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// Middleware to validate JWTs using Auth0 configurations
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
});
// Middleware to decode JWT, extract user identity, and verify existence in the database
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    // Validate presence of authorization token
    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.sendStatus(401);
    }
    // Extract the token from the header
    const token = authorization.split(' ')[1];
    try {
        // Decode token without verifying, and extract user identifier from token
        const decoded = jsonwebtoken_1.default.decode(token);
        const auth0Id = decoded.sub;
        // Look up user in database by their Auth0 ID
        const user = yield user_1.default.findOne({ auth0Id });
        if (!user) {
            return res.sendStatus(401);
        }
        // Attach user information to the request object for downstream use
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
});
exports.jwtParse = jwtParse;
