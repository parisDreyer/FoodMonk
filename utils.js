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
    let food_arr = fooditem.split(" ");
    let food_str = food_arr.length > 0 ? `Shrt_Descrpt LIKE "%${food_arr[0]}%"` : `Shrt_Descrpt LIKE ""`;
    for(let i = 1; i < food_arr.length; ++i){
        food_str += ` AND Shrt_Descrpt LIKE "%${food_arr[i]}%"`
    }
    db.all(`SELECT * FROM NutritionFacts WHERE ${food_str}`, (e, rows) => {

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