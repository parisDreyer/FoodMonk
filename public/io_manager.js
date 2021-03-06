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
    
    filtered = filter(food_text, botTextResponseOptions);

    //document.getElementById("text-display").innerHTML += `<div class="user-input">${food_text}</div>`;
    appendToTextDisplay(`<div class="user-input">${food_text}</div>`);
    if (filtered.type === 0) xhrFoodReq(filtered.text);
    else {
        appendToTextDisplay(`<div class="bot-input">${filtered.text}</div>`);
        //document.getElementById("text-display").innerHTML += `<div class="bot-input">${filtered.text}</div>`;
    }
    

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
            appendToTextDisplay(`<div class="bot-input">
                Which one was it?
                <br/>
                <select id="chooseCurFood">
                    ${opts}
                </select>
                <button onClick="assignFood()">Choose</button>
            </div>`);
            // document.getElementById("text-display").innerHTML += `<div class="bot-input">
            //     Which one was it?
            //     <br/>
            //     <select id="chooseCurFood">
            //         ${opts}
            //     </select>
            //     <button onClick="assignFood()">Choose</button>
            // </div>`;
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
    let current_nutrient_intake = "";       // this will be used to render nutrients if the user is interested

    for(let i = 0; i < keys.length; ++ i){
        if (rdi[keys[i]] || rdi[keys[i]] ===  0) {
            rdi[keys[i]] += chosen_food[keys[i]]; // update the given rdi values
            current_nutrient_intake += `${keys[i]}: ${rdi[keys[i]]}<br/>`;
        }
    }
    // saving to sessionStorage
    sessionStorage.setItem("userDefaultNutritionTrack", JSON.stringify(rdi));


    let t = currentDateString();
    // set the bot chat-output to the screen for the user to read
    choice.parentElement.innerHTML = `You ate ${chosen_food.Shrt_Descrpt} at ${t}. 
        <br/> <br/> ${botTextResponseOptions[2](t, current_nutrient_intake)}`;
    window.localStorage.clear();
}

function showAndHide(toShow, toHide) {
    document.getElementById(toShow).classList.remove('hidden');
    document.getElementById(toHide).classList.add('hidden');
    let mainDiv = document.getElementById("text-display");
    mainDiv.scrollTop = mainDiv.scrollHeight;
}
function currentDateString(){
    let currentdate = new Date();
    return "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
}

const botTextResponseOptions = {
  2: (t = new Date().toString(), current_nutrient_intake = false) => {
    if (!current_nutrient_intake) {
      // retrieve the nutrition data for the user from session storage
      current_nutrient_intake = ""; // this will be used to render nutrients if the user is interested
      let rdi = JSON.parse(sessionStorage.getItem("userDefaultNutritionTrack"));
      let keys = Object.keys(rdi);

      for (let i = 0; i < keys.length; ++i) {
        current_nutrient_intake += `${keys[i]}: ${rdi[keys[i]]}<br/>`;
      }
    }

    return `<button id="nutrient-info-button-${t}"
                onClick="showAndHide('nutrient-info-${t}', 'nutrient-info-button-${t}')">
                Show Current Nutrient Info
            </button>
            <div id="nutrient-info-${t}" style="color:black;border:none;" class="hidden">
            <br /> Your current nutritive intake for the day is: <br />${current_nutrient_intake}</div>`;
  }
};

// appends text to the text-display div, then adjusts the scroll position for the div
function appendToTextDisplay(text){
    let mainDiv = document.getElementById("text-display")
    mainDiv.innerHTML += text;

    mainDiv.scrollTop = mainDiv.scrollHeight;
    scrollToBottom(mainDiv);
} function scrollToBottom(divEl) { divEl.scrollTop = divEl.scrollHeight;}



{/* <br /> <br />
    <button id="nutrient-info-button-${t}"
        onClick="showAndHide('nutrient-info-${t}', 'nutrient-info-button-${t}')">
        Show Current Nutrient Info
        </button>
    <div id="nutrient-info-${t}" style="color:black;border:none;" class="hidden">
        <br /> Your current nutritive intake for the day is: <br />${current_nutrient_intake}</div> */}