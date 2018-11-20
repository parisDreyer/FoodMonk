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
    let ui = document.getElementById("food-text"); // handle on user input
    let food_text = ui.value.replace(/\n/gi, " ").replace(/  /gi, " ");  // the text, taking out line breaks from textarea
    ui.value = "";                  // clear the text so the user sees a change
    
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
                <br/>
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

    // get the chosen dish from session storage
    let choice = document.getElementById("chooseCurFood");
    let chosen_food = JSON.parse(window.localStorage.getItem(choice.selectedIndex));

    // get the session storage rdi data to update
    let rdi = JSON.parse(sessionStorage.getItem("userDefaultNutritionTrack"));

    // update the rdi then save back to sessionStorage
    let keys = Object.keys(chosen_food);
    for(let i = 0; i < keys.length; ++ i){
        rdi[keys[i]] += chosen_food[keys[i]]; // update the given rdi values
    }
    // saving to sessionStorage
    let current_nutrient_intake = JSON.stringify(rdi);
    sessionStorage.setItem("userDefaultNutritionTrack", current_nutrient_intake);


    // set the bot chat-output to the screen for the user to read
    choice.parentElement.innerHTML = `You ate ${chosen_food.Shrt_Descrpt}.
        Bringing your current nutritive intake for the day to: ${current_nutrient_intake}`;
    window.localStorage.clear();
}


