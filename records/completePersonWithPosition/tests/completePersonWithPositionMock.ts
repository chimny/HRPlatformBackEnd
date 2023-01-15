


export const completePersonWithPositionMock = () => {

    jest.mock('../../../utils/db', () => {
        return {
            pool: {
                execute: jest.fn().mockImplementation(() => Promise.resolve([[
                    {
                        personId: '123',
                        name: 'John',
                        surName: 'Doe',
                        position: 'Manager',
                        salary: 5000
                    },
                    {
                        personId: '456',
                        name: 'Jane',
                        surName: 'Doe',
                        position: 'Assistant',
                        salary: 4000
                    }
                ], []]))
            }
        };
    });

}