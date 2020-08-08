const db = require("sqlite-async");


function execute(db) {
  //criar tabelas
  return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );


        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id  INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER,
            class_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY,
            name TEXT
        );

        CREATE TABLE IF NOT EXISTS week (
            id INTEGER PRIMARY KEY,
            name TEXT
        );
    `);
}




module.exports = db.open(__dirname + "/database.sqlite").then(execute);