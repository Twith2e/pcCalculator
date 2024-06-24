function selectedBtn(button) {
  let screenDisplay = document.getElementById("screen-display");
  let upperScreenDisplay = document.getElementById("upper-display");
  let inputArray = [];
  inputArray.push(button.value);
  for (i = 0; i < inputArray.length; i++) {
    switch (true) {
      case screenDisplay.innerText === "0" ||
        upperScreenDisplay.innerText !== "":
        screenDisplay.innerText = inputArray[i];
        console.log(screenDisplay.innerText);
        break;
      default:
        screenDisplay.innerText += inputArray[i];
    }
  }
}

function mathOperator(button) {
  let screenDisplay = document.getElementById("screen-display");
  if (
    button.value === "/" ||
    button.value === "-" ||
    button.value === "+" ||
    button.value === "*"
  ) {
    let upperScreenDisplay = document.getElementById("upper-display");
    let newArray = [];
    let inputtedNumbers = "";
    newArray.push(screenDisplay.innerText);
    for (i = 0; i < newArray.length; i++) {
      inputtedNumbers += newArray[i];
    }
    upperScreenDisplay.innerText = `${inputtedNumbers} ${button.value}`;
    screenDisplay.innerText = "";
  }
}

function solveMath() {
  let screenDisplay = document.getElementById("screen-display");
  let upperScreenDisplay = document.getElementById("upper-display");
  let operator = "";
  let values = [];

  upperScreenDisplay.innerText += ` ${screenDisplay.innerText}`;
  let parts = upperScreenDisplay.innerText.split(/([\/\+\-\*])/);
  for (i = 0; i < parts.length; i++) {
    if (["/", "+", "-", "*"].includes(parts[i])) {
      operator += parts[i];
    } else {
      values.push(parts[i]);
    }
  }

  if (operator === "/") {
    screenDisplay.innerText = +values[0] / +values[1];
  } else if (operator === "-") {
    screenDisplay.innerText = +values[0] - +values[1];
  } else if (operator === "*") {
    screenDisplay.innerText = +values[0] * +values[1];
  } else if (operator === "+") {
    screenDisplay.innerText = +values[0] + +values[1];
  } else {
    upperScreenDisplay.innerText = screenDisplay.innerText + " " + "=";
  }
}

function clearScreen() {
  let screenDisplay = document.getElementById("screen-display");
  let upperScreenDisplay = document.getElementById("upper-display");

  screenDisplay.innerText = 0;
  upperScreenDisplay.innerText = "";
}
