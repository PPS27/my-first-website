document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Update display
    function updateDisplay(value) {
        display.value = value;
    }

    // Append number or decimal
    function appendNumber(number) {
        if (display.value === '0' || resetScreen) {
            resetScreen = false;
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    }

    // Append decimal point
    function appendDecimal() {
        if (resetScreen) {
            resetScreen = false;
            currentInput = '0.';
            updateDisplay(currentInput);
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    // Handle operations
    function handleOperation(op) {
        if (operation !== null && !resetScreen) calculate();
        previousInput = currentInput || previousInput;
        currentInput = '';
        operation = op;
        resetScreen = true;
    }

    // Calculate result
    function calculate() {
        if (operation === null || resetScreen) return;
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }

        // Handle division by zero
        if (operation === '÷' && current === 0) {
            showError("Cannot divide by zero");
            return;
        }

        currentInput = result.toString();
        operation = null;
        resetScreen = true;
        updateDisplay(currentInput);
        
        // Add to history
        addToHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);
    }

    // Clear everything
    function clearAll() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay('0');
    }

    // Delete last character
    function deleteLastChar() {
        if (resetScreen) return;
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
            resetScreen = true;
        }
        updateDisplay(currentInput);
    }

    // Show error message
    function showError(message) {
        updateDisplay(message);
        setTimeout(() => {
            if (currentInput === message) {
                clearAll();
            }
        }, 1500);
    }

    // Add calculation to history (you could implement a visible history panel)
    function addToHistory(calculation) {
        console.log('Calculation:', calculation);
        // In a real app, you might add this to a visible history panel
    }

    // Percentage function
    function percentage() {
        if (currentInput === '') return;
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }

    // Toggle positive/negative
    function toggleSign() {
        if (currentInput === '' || currentInput === '0') return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
        else if (e.key === '.') appendDecimal();
        else if (e.key === '=' || e.key === 'Enter') calculate();
        else if (e.key === 'Escape') clearAll();
        else if (e.key === 'Backspace') deleteLastChar();
        else if (e.key === '+') handleOperation('+');
        else if (e.key === '-') handleOperation('-');
        else if (e.key === '*') handleOperation('×');
        else if (e.key === '/') {
            e.preventDefault(); // Prevent quick search in some browsers
            handleOperation('÷');
        }
        else if (e.key === '%') percentage();
    });

    // Button click handlers
    window.appendToDisplay = function(value) {
        if (value >= '0' && value <= '9') {
            appendNumber(value);
        } else if (value === '.') {
            appendDecimal();
        }
    };

    window.clearDisplay = clearAll;
    window.backspace = deleteLastChar;
    window.calculate = calculate;

    // Additional operation buttons would need to be added to HTML
    window.setOperation = function(op) {
        handleOperation(op);
    };

    window.percentage = percentage;
    window.toggleSign = toggleSign;
});
