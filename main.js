let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let decimalBtn = document.getElementById('decimal');
let clearBtns = document.querySelectorAll('.clear_btn');
let display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {        
        operationPress(e.target.textContent);
    });
};

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);               
    });
};

decimalBtn.addEventListener('click', decimal);

// Числа
function numberPress(number) {
    if (MemoryNewNumber) {
      display.value = number;
      MemoryNewNumber = false;
    } else {
      if (display.value === '0') {
        display.value = number;
      } else {
          if (number === '-') {
            operationPress('-');
          } else {
            display.value += number;
          };   
        };
    };
};

// Операции
function operationPress(op) {
    let localOperationMemory = display.value;

    if(MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== '√') {
        display.value = MemoryCurrentNumber;
    } else {        
        if(MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '×') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, parseFloat(localOperationMemory));
        } else if (MemoryPendingOperation === '√') {
            MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        MemoryNewNumber = true;
        if (MemoryCurrentNumber !== MemoryCurrentNumber) {
            MemoryCurrentNumber = 'Не тупи!!!!!';
        };

        if (MemoryCurrentNumber.toString().indexOf('.') !== -1) {
            MemoryCurrentNumber = +(MemoryCurrentNumber.toString().replace(/([0]{4,}[1-9])$/g, ""));
        };
        
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
};

// Добавление точки
function decimal() {
    let localDecimalMemory = display.value;

    if(MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };        
    };

    display.value = localDecimalMemory;
};

// Очистка результатов
function clear(id) {
    if(id === 'ce') {
        let str = display.value.slice(0, length-1);
        display.value = str;
        MemoryNewNumber = true;
    } else if(id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};

