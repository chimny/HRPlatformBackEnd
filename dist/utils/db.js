"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
    decimalNumbers: true,
});
// export const pool = createPool({
//     host: 'sql7.freesqldatabase.com',
//     user: 'sql7626446',
//     database: 'sql7626446',
//     password: 'epH4mhwXbW',
//     namedPlaceholders: true,
//     decimalNumbers: true,
// });
// below pool for localhost connection
//  export const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'hr_platform',
//     namedPlaceholders: true,
//     decimalNumbers: true,
// });
//# sourceMappingURL=db.js.map