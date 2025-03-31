let display = document.getElementById("display");
let scientificVisible = false;

function appendCharacter(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function toggleScientific() {
    scientificVisible = !scientificVisible;
    document.querySelector(".scientific-buttons").style.display = scientificVisible ? "grid" : "none";
}
