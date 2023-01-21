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
exports.addPersonRouter = void 0;
const personIdPositionSalaryValidator_1 = require("./functions/personIdPositionSalaryValidator");
const personPosition_record_1 = require("../records/personPosition/personPosition.record");
const express_1 = require("express");
const person_record_1 = require("../records/person/person.record");
exports.addPersonRouter = (0, express_1.Router)();
exports.addPersonRouter
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let responseMessage;
    const { name, surname, position, salary } = req.body;
    //        Validation for person record below
    if (!name || !surname || name.length === 0 || surname.length === 0) {
        responseMessage = {
            message: 'name and surName can\'t be empty!',
            status: 'error'
        };
        res.json(responseMessage);
        return;
    }
    const newPerson = new person_record_1.PersonRecord({ name, surName: surname });
    yield newPerson.insert();
    const personId = newPerson.id;
    //        Validation for proper personId, if the position is in position list and salary is set in proper form
    if (yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)(personId, position, salary)) {
        responseMessage = {
            message: String(yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)(personId, position, salary)),
            status: 'error'
        };
        res.json(responseMessage);
        return;
    }
    const newPersonPosition = new personPosition_record_1.PersonPositionRecord({ personId, position, salary });
    yield newPersonPosition.insert();
    responseMessage = {
        message: `Person ${name} ${surname} with id ${personId} has been added with position: ${position} and salary ${salary}`,
        status: 'success'
    };
    res.json(responseMessage);
}));
//# sourceMappingURL=addPersonRouter.js.map