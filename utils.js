const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./Nutrition.db");
// const { updateTables } = require("./databaseUtils/databaseInput.js");
// const { chooseWords } = require("./databaseUtils/databaseOutput.js");

const textToFile = (callback) => {
    db.all("SELECT * FROM NutritionFacts", (e, rows) => {
        // console.log(rows);
        callback(rows)});
};


const readFromFile = (fooditem, callback) => {
    console.log("scan food", fooditem);
    db.all(`SELECT * FROM NutritionFacts WHERE Shrt_Descrpt LIKE "%${fooditem}%"`, (e, rows) => {

        // console.log(e, rows);
        if (rows)
            callback(rows);
        else
            callback(e);
    });

};

const readAll = (callback) => {
    db.all("SELECT * FROM NutritionFacts", (e, rows) => {
        console.log('rows', rows);
        if (rows)
            callback(rows);
        else
            callback(e);
        
    });
}

module.exports = { textToFile, readFromFile, readAll};