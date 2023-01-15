import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7584738',
    database: 'sql7584738',
    password:'ScS8nHbVJv',
    namedPlaceholders: true,
    decimalNumbers: true,
});




 // below pool for localhost connection


//
//  export const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'hr_platform',
//     namedPlaceholders: true,
//     decimalNumbers: true,
// });


