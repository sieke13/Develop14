"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    // TODO: verify the token exists and add the user data to the request object
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const jwtToken = jsonwebtoken_1.default.decode(token);
    if (jwtToken) {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded;
            return next();
        });
    }
};
exports.authenticateToken = authenticateToken;
