const massive = require('massive');
const config = require('./src/commons/config');
let db;

module.exports = {
    getDB: async function () {
        try {
            if (!db) {
                db = await massive({
                    host: config.DATABASE_HOST,
                    port: config.DATABASE_PORT,
                    database: config.DATABASE_NAME,
                    user: config.DATABASE_USER,
                    password: config.DATABASE_PASSWORD
                });
            }
            return db;
        }
        catch (err) {
            console.error(err);
        }
    }
}
    ;


