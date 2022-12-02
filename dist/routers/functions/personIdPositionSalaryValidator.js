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
exports.personIdPositionSalaryValidator = void 0;
const person_record_1 = require("../../records/person.record");
function personIdPositionSalaryValidator(personId, position, salary) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = [];
        const peopleList = yield person_record_1.PersonRecord.listAll();
        const positionList = ['Assistant', 'Manager', "Specialist", 'Junior Specialist', 'Trainee', 'Senior Specialist'];
        if (!peopleList.find(el => el.id === personId)) {
            errors.push('person not found');
        }
        if (Number(salary) < 0) {
            errors.push('salary below 0');
        }
        if (isNaN(Number(salary))) {
            errors.push('sent salary is not a number!');
        }
        if (!positionList.find(el => el === position)) {
            errors.push('position is not on the list!');
        }
        //if validation went successful return boolean to proceed further in post process
        if (errors.length === 0) {
            return false;
        }
        //detailed errors
        return errors.join(', ');
    });
}
exports.personIdPositionSalaryValidator = personIdPositionSalaryValidator;
//# sourceMappingURL=personIdPositionSalaryValidator.js.map