"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11592221',
    database: 'sql11592221',
    password: '2gEcLdClSM',
    namedPlaceholders: true,
    decimalNumbers: true,
});
// Server: sql11.freemysqlhosting.net
// Name: sql11592221
// Username: sql11592221
// Password: 2gEcLdClSM
// Port number: 3306
// below pool for localhost connection
//  export const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'hr_platform',
//     namedPlaceholders: true,
//     decimalNumbers: true,
// });
//# sourceMappingURL=db.js.map