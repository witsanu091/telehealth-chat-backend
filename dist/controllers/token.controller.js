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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const token_service_1 = require("../services/token.service");
const generateToken = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { patient_id, consult_id, room } = request.body;
    if (!room || (!patient_id && !consult_id)) {
        return reply.status(400).send({ error: 'Missing required fields' });
    }
    const payload = {
        room,
        role: patient_id ? 'consult' : 'patient',
        id: patient_id || consult_id,
    };
    const { token, room_id } = yield (0, token_service_1.createToken)(payload);
    reply.send({ chat_token: token, room_id: room_id });
});
exports.generateToken = generateToken;
