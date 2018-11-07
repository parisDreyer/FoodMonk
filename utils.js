const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Nutrition.db");
// const { updateTables } = require("./databaseUtils/databaseInput.js");
// const { chooseWords } = require("./databaseUtils/databaseOutput.js");

const textToFile = (callback) => {
    db.all("SELECT * FROM NutritionFacts", (e, rows) => {
        console.log(rows);
        callback(rows)});
};


const readFromFile = (data) => { const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./databaseUtils/Words.db');
// const { updateTables } = require('./databaseUtils/databaseInput.js');
// const { chooseWords } = require('./databaseUtils/databaseOutput.js');


};

const readAll = (callback) => {
    db.all("SELECT * FROM NutritionFacts", (e, rows) => {
        console.log(rows);
        callback(rows)
    });
}

module.exports = { textToFile, readFromFile, readAll};