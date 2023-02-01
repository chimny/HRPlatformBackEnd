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
const db_1 = require("../../../utils/db");
const mockValue_1 = require("./mockValue");
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("DELETE")) {
                    return Promise.resolve([mockValue_1.mockValue[0].filter(el => el.id === params.id), []]);
                }
                else {
                    return Promise.resolve(mockValue_1.mockValue);
                }
            })
        }
    };
});
describe('deleteOne', () => {
    test('it should remove record from mock and return a message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield person_record_1.PersonRecord.deleteOne('123');
        expect(response).toEqual('user has been deleted');
        expect(db_1.pool.execute).toBeCalledWith("DELETE FROM `peoplelist` WHERE `id`=:id", { id: '123' });
    }));
    test('it should return an error if the id does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield person_record_1.PersonRecord.deleteOne('11111111');
        }
        catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
});
//# sourceMappingURL=personDeleteOne.test.js.map