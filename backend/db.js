const mysql = require('mysql');
const Response = require('./utils/response');
const sqlQueries = require('./constants').sqlQueries;
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "library",
    password: "1234",
    insecureAuth : true
});
const query = async function (sqlQuery) {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(sqlQuery, function (err, result) {
                if (err) {
                    console.log(sqlQuery, err.sqlMessage || err);

                    return reject(err);
                }

                resolve(result);
            });
        });
    } catch (err) {
        return err;
    }
}

module.exports.query = query;
module.exports.initialize = function () {
    connection.connect(async function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Connected to the mysql");

        await Promise.all([
            query(sqlQueries.createTables.book),
            query(sqlQueries.createTables.borrow_list),
           
        ]);

        await Promise.all([
            query(sqlQueries.createTrigger.afterBorrowAdded),

        ]);
    });
}
