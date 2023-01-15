import { pool } from "../../../utils/db";
import {CompletePersonWithPosition} from "../completePersonWithPosition.record";
import {completePersonWithPositionMock} from "./completePersonWithPositionMock";


describe('CompletePersonWithPositionListAll', () => {
    beforeAll(() => {
        completePersonWithPositionMock()
    });

    test('listAll should return an array of complete person with position', async () => {
        const completePersonWithPositions = await CompletePersonWithPosition.listAll();
        expect(Array.isArray(completePersonWithPositions)).toBe(true);
        completePersonWithPositions.forEach(person => {
            expect(person).toHaveProperty('personId');
            expect(person).toHaveProperty('name');
            expect(person).toHaveProperty('surName');
            expect(person).toHaveProperty('salary');
            expect(person).toHaveProperty('position');
        });
    });

    afterAll(() => {
        pool.end()
    });
});
