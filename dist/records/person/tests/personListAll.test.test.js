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
const person_record_1 = require("../person.record");
const mockValue_1 = require("./mockValue");
// mock the `execute` method of the `pool` object
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve(mockValue_1.mockValue))
        }
    };
});
describe('listAll', () => {
    test('should return a list of all people', () => __awaiter(void 0, void 0, void 0, function* () {
        const people = yield person_record_1.PersonRecord.listAll();
        expect(people).toEqual([
            { id: '123', name: 'John', surName: 'Doe' },
            { id: '456', name: 'Jane', surName: 'Doe' },
        ]);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personListAll.test.test.js.map