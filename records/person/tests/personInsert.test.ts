import {PersonRecord} from "../person.record";
import {pool} from "../../../utils/db";
import { mockValue } from "./mockValue";



jest.mock('../../../utils/db', () => {
    return {
        pool: {
            execute: jest.fn().mockImplementation(() => Promise.resolve(mockValue))
        }
    };
});

describe('person object test insert', () => {
    test('should insert new record and return id', async () => {
        const person = new PersonRecord({name: 'Joseph', surName: 'Draw'});
        await person.insert();
        expect(pool.execute).toHaveBeenCalledWith("INSERT INTO `peoplelist`(`id`, `name`,`surName`) VALUES(:id, :name,:surName) ", {
            id: person.id,
            name: person.name,
            surName: person.surName
        });
    });
});


