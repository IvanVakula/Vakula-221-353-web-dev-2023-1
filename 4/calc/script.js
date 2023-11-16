document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('screenContent');
    let currentInput = "";

    function isNumeric(str) {
        return /^\d+(.\d+){0,1}$/.test(str);
    }

    function evaluateRPN(tokens) {
        let stack = [];

        for (let token of tokens) {
            if (isNumeric(token)) {
                stack.push(parseFloat(token));
            } else {
                let operand2 = stack.pop();
                let operand1 = stack.pop();

                switch (token) {
                    case '+':
                        stack.push(operand1 + operand2);
                        break;
                    case '-':
                        stack.push(operand1 - operand2);
                        break;
                    case '*':
                        stack.push(operand1 * operand2);
                        break;
                    case '/':
                        stack.push(operand1 / operand2);
                        break;
                    default:
                        throw new Error("Invalid operator: " + token);
                }
            }
        }

        if (stack.length !== 1) {
            throw new Error("Invalid expression");
        }

        return stack.pop().toFixed(2);
    }

    function clickHandler(event) {
        const target = event.target;

        if (target.classList.contains('digit') || target.classList.contains('operation') || target.classList.contains('bracket')) {
            currentInput += target.textContent;
            screen.textContent = currentInput;
        } else if (target.classList.contains('clear')) {
            currentInput = '';
            screen.textContent = '';
        } else if (target.classList.contains('result')) {
            try {
                const tokens = tokenize(currentInput);
                const result = evaluateRPN(tokens);
                currentInput = result;
                screen.textContent = result;
            } catch (error) {
                console.error(error.message);
                screen.textContent = 'Error';
            }
        }
    }

    function tokenize(str) {
        return str.split(/\s+/).filter(token => token.length > 0);
    }

    document.getElementById('calculator').addEventListener('click', clickHandler);
});