// Calculator state
let display = document.getElementById("display");
let historyDisplay = document.getElementById("history");
let memory = 0;
let scientificVisible = false;
let lastResult = null;

// Main functions
function appendCharacter(char) {
    // If there was an error, clear it before appending
    if (display.value === "Error" || display.value === "Infinity" || display.value === "NaN") {
        display.value = "";
    }
    
    // Handle special constants
    if (char === "Math.PI") {
        display.value += Math.PI;
    } else if (char === "Math.E") {
        display.value += Math.E;
    } else {
        display.value += char;
    }
}

function appendFunction(func, closingChar = "") {
    if (display.value === "Error" || display.value === "Infinity" || display.value === "NaN") {
        display.value = "";
    }
    display.value = func + display.value + closingChar;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        // Save current expression to history
        historyDisplay.textContent = display.value + " =";
        
        // Replace visual operators with JavaScript operators
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\−/g, '-');
        
        // Evaluate the expression
        lastResult = eval(expression);
        display.value = lastResult;
        
        // Handle special cases
        if (!isFinite(lastResult)) {
            throw new Error("Invalid result");
        }
    } catch (error) {
        display.value = "Error";
        console.error("Calculation error:", error);
    }
}

// Memory functions
function memoryClear() {
    memory = 0;
    display.value = "";
}

function memoryRecall() {
    display.value = memory;
}

function memoryAdd() {
    try {
        memory += eval(display.value || "0");
    } catch {
        memory = 0;
    }
}

function memorySubtract() {
    try {
        memory -= eval(display.value || "0");
    } catch {
        memory = 0;
    }
}

// Scientific functions toggle
function toggleScientific() {
    scientificVisible = !scientificVisible;
    const sciButtons = document.querySelector(".scientific-buttons");
    sciButtons.style.display = scientificVisible ? "grid" : "none";
    
    // Add animation class
    sciButtons.classList.add("animate-toggle");
    setTimeout(() => sciButtons.classList.remove("animate-toggle"), 300);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    // Prevent default for calculator keys
    if (/[0-9\.\+\-\*\/\%\^\(\)]/.test(key) || 
        key === "Enter" || key === "Backspace" || key === "Escape") {
        e.preventDefault();
    }
    
    // Map keys to calculator functions
    if (/[0-9]/.test(key)) {
        appendCharacter(key);
    } else if (key === '.') {
        appendCharacter('.');
    } else if (key === '+') {
        appendCharacter('+');
    } else if (key === '-') {
        appendCharacter('−');
    } else if (key === '*') {
        appendCharacter('×');
    } else if (key === '/') {
        appendCharacter('÷');
    } else if (key === '%') {
        appendCharacter('%');
    } else if (key === '(' || key === ')') {
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'm' || key === 'M') {
        toggleScientific();
    }
});

// Add button press effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.classList.add('button-press');
    });
    
    button.addEventListener('mouseup', () => {
        button.classList.remove('button-press');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('button-press');
    });
});
