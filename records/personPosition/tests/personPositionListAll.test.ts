import { PersonPositionRecord } from "../personPosition.record";
import {mockValue, record} from "./mockValue";
import {PersonRecord} from "../../person/person.record";
import {pool} from "../../../utils/db";
import {PersonPositionEntity} from "../../../types/personPosition";



jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve([mockValue,[]]))
        }
    };
});

describe('list all person position records', () => {
    test('it should pass array of objects with records', async () => {
        const response = await PersonPositionRecord.listAll();
        expect([record]).toEqual(response);
    });



    afterEach(() => {
        jest.clearAllMocks()
    });

});




