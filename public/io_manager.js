function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (res) {
        // if (this.readyState == 4 && this.status == 200) {
        console.log(res);
        document.getElementById("text-display").innerHTML = this.response;
        // }
    }
    xhttp.open("GET", "alltext");
    xhttp.send();
}

// function updateAll(data){

// }