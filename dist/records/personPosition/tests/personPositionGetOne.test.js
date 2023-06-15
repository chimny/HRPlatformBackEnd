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
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (params.personId === '123') {
                    return Promise.resolve([[mockValue_1.record], []]);
                }
                else {
                    return Promise.resolve([[], []]);
                }
            })
        }
    };
});
describe('personPositionGetOne', () => {
    test('it should insert a record and return the id', () => __awaiter(void 0, void 0, void 0, function* () {
        const foundRecord = yield personPosition_record_1.PersonPositionRecord.getOne('123');
        expect(foundRecord).toEqual(mockValue_1.record);
    }));
    test('it should return null if record wasn\'t found', () => __awaiter(void 0, void 0, void 0, function* () {
        const foundRecord = yield personPosition_record_1.PersonPositionRecord.getOne('ss ssss');
        expect(foundRecord).toEqual(null);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personPositionGetOne.test.js.map