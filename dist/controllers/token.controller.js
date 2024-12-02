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
exports.generateTokenForPatient = exports.generateTokenForConsult = void 0;
const token_service_1 = require("../services/token.service");
const generateTokenForConsult = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { patient_id, room } = request.body;
    const token = (0, token_service_1.createToken)({ patient_id, room, role: 'consult' });
    reply.send({ chat_token: token });
});
exports.generateTokenForConsult = generateTokenForConsult;
const generateTokenForPatient = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { consult_id, room } = request.body;
    const token = (0, token_service_1.createToken)({ consult_id, room, role: 'patient' });
    reply.send({ chat_token: token });
});
exports.generateTokenForPatient = generateTokenForPatient;
