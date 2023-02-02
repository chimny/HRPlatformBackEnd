import { PersonPositionRecord } from "../personPosition.record";
import { mockValue } from "./mockValue";
import {PersonRecord} from "../../person/person.record";
import {pool} from "../../../utils/db";
import {PersonPositionEntity} from "../../../types/personPosition";




// mock the `execute` method of the `pool` object
jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation((query, params) => {
                if (query.includes("UPDATE")) {
                    return Promise.resolve([mockValue[0].concat([params]), []]);
                } else {
                    return Promise.resolve(mockValue);
                }
            })
        }
    };
});

describe('update one', () => {
    test('it should update record and return the updated record', async () => {
        const updatedRecord : PersonPositionEntity  = { personId:'123', position:'Manager',salary:22000}
        const response = await PersonPositionRecord.updateOne(updatedRecord.personId,updatedRecord.position,updatedRecord.salary);
        expect(response).toEqual(updatedRecord);
        expect(pool.execute).toBeCalledWith("UPDATE `peoplelist_positions` SET `position`=:position, `salary`=:salary WHERE `personId`=:personId", updatedRecord);
    });

    test('it should return an error if the id does not exist', async () => {
        try {
            await PersonPositionRecord.updateOne('invalidId', 'Manager', 555000);
        } catch (error) {
            expect(error.message).toEqual('Record not found');
        }
    });


    test('it should return an error if salary is below 0', async () => {
        try {
            await PersonPositionRecord.updateOne('123', 'Manager', -555000);

        } catch (error) {
            expect(error.message).toEqual('Salary cannot be below 0!');
        }
    });

    test('it should return an error if passed position is not in assumed list', async () => {
        try {
            await PersonPositionRecord.updateOne('123', 'Banana', 5000);
        } catch (error) {
            expect(error.message).toEqual('position is not on the allowed list!');
        }
    });



    afterEach(() => {
        jest.clearAllMocks()
    });

});
