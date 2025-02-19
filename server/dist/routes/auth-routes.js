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
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Find the user in the database by username
    const user = yield user_js_1.User.findOne({ where: { username } });
    // If user is not found, send an authentication failed response
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Compare the provided password with the stored hashed password
    const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate a JWT token for the authenticated user
    const token = jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token }); // Send the token as a JSON response
});
router.post('/login', loginHandler);
exports.default = router;
