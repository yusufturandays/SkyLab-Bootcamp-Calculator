function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function addToHistory(expression, result) {
    const historyList = document.getElementById("history-list");
    const newEntry = document.createElement("li");
    newEntry.textContent = `${expression} = ${result}`;
    historyList.appendChild(newEntry);
}

function calculateResult() {
    const display = document.getElementById("display");
    try {
        let result;
        const expression = display.value; 
        if (display.value.includes('^')) {
            const parts = display.value.split('^');
            const base = parseFloat(parts[0]);
            const exponent = parseFloat(parts[1]);
            if (!isNaN(base) && !isNaN(exponent)) {
                result = calculateExponent(base, exponent);
            } else {
                result = "HATA!";
            }
        } else if (display.value.includes('%')) {
            const parts = display.value.split('%');
            const base = parseFloat(parts[0]);
            const percentage = parseFloat(parts[1]);
            if (!isNaN(base) && !isNaN(percentage)) {
                result = (base * (percentage / 100)).toString();
            } else {
                result = "HATA!";
            }
        } else {
            result = eval(display.value);
        }

        display.value = result;
        addToHistory(expression, result);

    } catch (error) {
        display.value = "HATA!";
    }
}


function calculateSquareRoot() {
    const display = document.getElementById("display");
    const result = Math.sqrt(eval(display.value));
    addToHistory(`√${display.value}`, result); 
    display.value = result;
}

function calculateExponent(base, exponent) {
    return Math.pow(base, exponent);
}

function toggleTheme() {
    const calculator = document.querySelector('.calculator');
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const body = document.body;

    if (calculator.classList.contains('dark')) {
        calculator.classList.remove('dark');
        calculator.classList.add('light');
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggleBtn.textContent = "🌞";
    } else {
        calculator.classList.remove('light');
        calculator.classList.add('dark');
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggleBtn.textContent = "🌙";
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    const display = document.getElementById("display");
    if (!isNaN(key)) {
        appendToDisplay(key);
    } else if (key === "+" || key === "-" || key === "/" || key === "*") {
        appendToDisplay(key);
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        clearDisplay();
    } 
    else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    }
});
