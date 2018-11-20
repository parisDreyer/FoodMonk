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


function getFoodData(filter) {
    let food_text = document
      .getElementById("food-text")
      .value.replace(/\n/gi, " ")
      .replace(/  /gi, " ");
    filtered = filter(food_text);

    document.getElementById("text-display").innerHTML += `<div class="user-input">${food_text}</div>`;
    if (filtered.type === 0) xhrFoodReq(filtered.text);
    else document.getElementById("text-display").innerHTML += `<div class="bot-input">${filtered.text}</div>`;;
    

    return (false); // prevents vanilla html form refresh
}


function xhrFoodReq(food){
    let alreadyPosted = false;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (e, res) {
        // if (this.readyState == 4 && this.status == 200) {
        // console.log(res);
        
        if (this.response.length > 0 && !alreadyPosted) {
            
            alreadyPosted = true;

            let items = JSON.parse(this.response);
            let opts = "";
            for(let i = 0; i < items.length; ++i){
                
                window.localStorage.setItem(i, JSON.stringify(items[i]));
                opts += `<option value="${i}">${items[i].Shrt_Descrpt}</option>`;

            }
            document.getElementById("text-display").innerHTML += `<div class="bot-input">
                Which one was it?
                <select id="chooseCurFood">
                ${opts}
                </select>
                <button onClick="assignFood()">Choose</button>
            </div>`;
        }
    }
    xhttp.open("POST", "foodtext", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let params = { food: food };
    xhttp.send(JSON.stringify(params));
}

function assignFood(){
    let choice = document.getElementById("chooseCurFood");
    choice.replaceWith(`<span>${window.localStorage.getItem(choice.selectedIndex)}</span>`);
    window.localStorage.clear();
}

// function updateAll(data){

// }