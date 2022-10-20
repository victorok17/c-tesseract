import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function getDBHandler() {
    try {
        const dbHandler = await open({
            filename: "database.db",
            driver: sqlite3.Database,
        });

        if (!dbHandler) throw new TypeError(`DB handler expected got ${dbHandler}`)

        return dbHandler;
    } catch (error) {
        console.error(
            `Something went wrong while creating DB Handler: ${error.message}`
        );
    }
}

async function initDB() {
    try {
        const dbHandler = await getDBHandler ();

        await dbHandler.exec(
            `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            is_completed INTEGER DEFAULT 0
            )`
        );

        await dbHandler.close();
    } catch (error){
        console.error(`There was an error while trying to init DB Handler: ${error.message}`);
    }
}

export { getDBHandler, initDB };
