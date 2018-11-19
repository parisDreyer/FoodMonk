function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (res) {
        // if (this.readyState == 4 && this.status == 200) {
        document.getElementById("text-display").innerHTML = this.response;
        // }
    }
    xhttp.open("GET", "alltext");
    xhttp.send();
}


function getFoodData() {
    let food_text = document.getElementById("food-text").value;
    console.log(food_text);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (e, res) {
        // if (this.readyState == 4 && this.status == 200) {
            console.log(res);
            document.getElementById("text-display").innerHTML = this.response;
            // }
        }
        xhttp.open("POST", "foodtext", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let params = { food: food_text};
    xhttp.send(JSON.stringify(params));
    return (false); // prevents vanilla html form refresh
}

// function updateAll(data){

// }