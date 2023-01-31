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
const personIdPositionSalaryValidator_1 = require("../personIdPositionSalaryValidator");
jest.mock('../../../records/person/person.record', () => {
    return {
        PersonRecord: {
            listAll: jest.fn(() => Promise.resolve([
                { id: '1', name: 'John Doe', age: 25 },
                { id: '2', name: 'Jane Smith', age: 30 },
                { id: '2', name: '12-9', age: -30 },
            ]))
        }
    };
});
describe('personIdPositionSalaryValidator', () => {
    test('should return error message if person is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)('3', 'Manager', '1000');
        expect(result).toBe('person not found');
    }));
    test('should return error message if salary is below 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)('1', 'Manager', '-1000');
        expect(result).toBe('salary is below 0');
    }));
    test('should return error message if salary is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)('1', 'Manager', 'not a number');
        expect(result).toBe('sent salary is not a number!');
    }));
    test('should return error message if position is not on the list', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)('1', 'Not on the list', '1000');
        expect(result).toBe('position is not on the list!');
    }));
    test('should return false if validation is successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, personIdPositionSalaryValidator_1.personIdPositionSalaryValidator)('1', 'Manager', '1000');
        expect(result).toBe(false);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personIdPositionSalaryValidator.test.js.map