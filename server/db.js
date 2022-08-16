import DataStore from "nedb";

const db = new DataStore({
    filename: "account.db",
    autoload: true,
});

export default db;
