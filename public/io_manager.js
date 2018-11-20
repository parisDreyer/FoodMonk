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


function getFoodData(stop_word_filter) {
    let food_text = document
      .getElementById("food-text")
      .value.replace(/\n/gi, " ")
      .replace(/  /gi, " ");
    let alreadyPosted = false;
    food_text = food_text.split(" ").filter(el => !stop_word_filter(el)).join(" ");
    document.getElementById("text-display").innerHTML += `<div class="user-input">${food_text}</div>`;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (e, res) {
        // if (this.readyState == 4 && this.status == 200) {
            // console.log(res);
            if(this.response.length > 0 && !alreadyPosted){
                alreadyPosted = true;
                document.getElementById("text-display").innerHTML += `<div class="bot-input">${this.response}</div>`;//this.response;
            }
        }
        xhttp.open("POST", "foodtext", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let params = { food: food_text};
    xhttp.send(JSON.stringify(params));
    return (false); // prevents vanilla html form refresh
}

// function updateAll(data){

// }