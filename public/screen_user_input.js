

const screen_input = (food_text, remove_stop_words) => {
    
    let f = food_text.toLowerCase().split(" ");

    let st = [];    // holds the food words
    let r = [];     // holds the conversational words
    let has_should_or_could = false;
    for(let i = 0; i < f.length; ++i){
        if (["is", "are", "what", "do", "you", "do", "your", "purpose"].includes(f[i]))
            r.push(f[i]);   // set conversational word
        else if (["should", "could"].includes(f[i])) has_should_or_could = true;
        else
            st.push(f[i])   // set food word
    }

    if (has_should_or_could) return {
        type: 1,
        text: "You can ask me anything. What have you eaten today?"
    }
    else if (r.length > 0) return {
        type: 2, 
        text:"I am FoodMonk, a nutritional chatbot that suggests what to eat " + 
            "based on what you have eaten. Tell me the foods you have eaten for the day " +
            "and i will suggest what you could eat next."
    };


    // return food search items
    return { 
        type: 0, 
        text: st.filter(el => !remove_stop_words(el)).join(" ") 
    }; 
}