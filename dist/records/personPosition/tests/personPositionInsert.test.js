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
// mock the `execute` method of the `pool` object
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("INSERT")) {
                    return Promise.resolve([mockValue_1.mockValue[0].concat([params]), []]);
                }
                else {
                    return Promise.resolve(mockValue_1.mockValue);
                }
            })
        }
    };
});
describe('insert', () => {
    test('it should insert a record and return the id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newRecord = new personPosition_record_1.PersonPositionRecord({
            personId: '123',
            position: 'Manager',
            salary: 50000
        });
        const response = yield newRecord.insert();
        expect(response).toEqual(newRecord.id);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personPositionInsert.test.js.map