"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, { expiresIn: '1h' });
};
exports.createToken = createToken;
