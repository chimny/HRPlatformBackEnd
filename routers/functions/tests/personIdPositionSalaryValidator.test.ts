import {personIdPositionSalaryValidator} from "../personIdPositionSalaryValidator";
import {PersonRecord} from "../../../records/person/person.record";


jest.mock('../../records/person.record', () => {


    return {
        PersonRecord: {
            listAll: jest.fn(() => Promise.resolve([
                {id: '1', name: 'John Doe', age: 25},
                {id: '2', name: 'Jane Smith', age: 30},
                {id: '2', name: '12-9', age: -30},
            ]))
        }
    }


});

describe('personIdPositionSalaryValidator', () => {
    test('should return error message if person is not found', async () => {
        const result = await personIdPositionSalaryValidator('3', 'Manager', '1000');
        expect(result).toBe('person not found');
    });

    test('should return error message if salary is below 0', async () => {
        const result = await personIdPositionSalaryValidator('1', 'Manager', '-1000');
        expect(result).toBe('salary is below 0');
    });

    test('should return error message if salary is not a number', async () => {
        const result = await personIdPositionSalaryValidator('1', 'Manager', 'not a number');
        expect(result).toBe('sent salary is not a number!');
    });

    test('should return error message if position is not on the list', async () => {
        const result = await personIdPositionSalaryValidator('1', 'Not on the list', '1000');
        expect(result).toBe('position is not on the list!');
    });

    test('should return false if validation is successful', async () => {

        const result = await personIdPositionSalaryValidator('1', 'Manager', '1000');
        expect(result).toBe(false);
    });
});