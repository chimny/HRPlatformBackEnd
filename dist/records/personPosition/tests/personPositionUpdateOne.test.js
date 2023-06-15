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
const personPosition_record_1 = require("../personPosition.record");
const mockValue_1 = require("./mockValue");
const db_1 = require("../../../utils/db");
// mock the `execute` method of the `pool` object
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("UPDATE")) {
                    return Promise.resolve([[mockValue_1.mockValue[0]].concat([params]), []]);
                }
                else {
                    return Promise.resolve(mockValue_1.mockValue);
                }
            })
        }
    };
});
describe('update one', () => {
    test('it should update record and return the updated record', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedRecord = { personId: '123', position: 'Manager', salary: 22000 };
        const response = yield personPosition_record_1.PersonPositionRecord.updateOne(updatedRecord.personId, updatedRecord.position, updatedRecord.salary);
        expect(response).toEqual(updatedRecord);
        expect(db_1.pool.execute).toBeCalledWith("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", updatedRecord);
    }));
    test('it should return an error if the id does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield personPosition_record_1.PersonPositionRecord.updateOne('invalidId', 'Manager', 555000);
        }
        catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    }));
    test('it should return an error if salary is below 0', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield personPosition_record_1.PersonPositionRecord.updateOne('123', 'Manager', -555000);
        }
        catch (error) {
            expect(error.message).toEqual('Salary cannot be below 0!');
        }
    }));
    test('it should return an error if passed position is not in assumed list', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield personPosition_record_1.PersonPositionRecord.updateOne('123', 'Banana', 5000);
        }
        catch (error) {
            expect(error.message).toEqual('position is not on the allowed list!');
        }
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personPositionUpdateOne.test.js.map