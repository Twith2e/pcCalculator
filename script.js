let screenDisplay = document.getElementById("screen-display");
let upperScreenDisplay = document.getElementById("upper-display");
let doneCalc = false;
let calcFirst = false;
let reset = false;
let repition = 0;
let firstTime = true;

function selectedBtn(button) {
  if (doneCalc === true) {
    doneCalc = false;
    upperScreenDisplay.innerText = "";
  }
  repition = 0;
  let inputArray = [];
  firstTime = true;
  inputArray.push(button.value);
  for (i = 0; i < inputArray.length; i++) {
    switch (true) {
      case screenDisplay.innerText === "0" || reset === true:
        reset = false;
        screenDisplay.innerText = +inputArray[i];

        break;
      default:
        screenDisplay.innerText += +inputArray[i];
    }
  }
}

function mathOperator(button) {
  reset = true;
  if (calcFirst === false && doneCalc === false) {
    calcFirst = true;
    if (
      button.value === "/" ||
      button.value === "-" ||
      button.value === "+" ||
      button.value === "*"
    ) {
      let newArray = [];
      let inputtedNumbers = "";
      newArray.push(screenDisplay.innerText);
      for (i = 0; i < newArray.length; i++) {
        inputtedNumbers += newArray[i];
      }
      upperScreenDisplay.innerText = `${inputtedNumbers} ${button.value}`;
    }
  } else {
    if (calcFirst === true && upperScreenDisplay.innerText.includes("+")) {
      if (repition === 0) {
        let splitted = upperScreenDisplay.innerText.split("+");
        let sum = +splitted[0] + +screenDisplay.innerText;
        screenDisplay.innerText = sum;
        upperScreenDisplay.innerText = `${sum} ${button.value}`;
        console.log(+splitted[0] + +splitted[0]);
        repition = 1;
      }
    } else if (
      calcFirst === true &&
      upperScreenDisplay.innerText.includes("-")
    ) {
      if (repition === 0) {
        let splitted = upperScreenDisplay.innerText.split("-");
        let sum = +splitted[0] - +screenDisplay.innerText;
        screenDisplay.innerText = sum;
        upperScreenDisplay.innerText = `${sum} ${button.value}`;
        repition = 1;
      }
    } else if (
      calcFirst === true &&
      upperScreenDisplay.innerText.includes("*")
    ) {
      if (repition === 0) {
        let splitted = upperScreenDisplay.innerText.split("*");
        let sum = +splitted[0] * +screenDisplay.innerText;
        screenDisplay.innerText = sum;
        upperScreenDisplay.innerText = `${sum} ${button.value}`;
        repition = 1;
      }
    } else if (
      calcFirst === true &&
      upperScreenDisplay.innerText.includes("/")
    ) {
      if (repition === 0) {
        if (+values[1] === 0) {
          screenDisplay.innerText = "Cannot divide by zero";
          return;
        }
        let splitted = upperScreenDisplay.innerText.split("/");
        let sum = +splitted[0] / +screenDisplay.innerText;
        screenDisplay.innerText = sum;
        upperScreenDisplay.innerText = `${sum} ${button.value}`;
        repition = 1;
      }
    }
  }
}

function solveMath() {
  calcFirst = false;
  repition = 0;
  reset = true;
  doneCalc = true;
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
    if (firstTime === true) {
      if (+values[1] === 0) {
        screenDisplay.innerText = "Cannot divide by zero";
        return;
      }
      upperScreenDisplay.innerText += " " + "=";
      screenDisplay.innerText = +values[0] / +values[1];
      firstTime = false;
    } else {
      let parts = upperScreenDisplay.innerText.split("="); // to split the current upperscreen innertext
      let dividand = parts[0].split("/"); //to split the current innertext
      upperScreenDisplay.innerText = `${parts[1]} / ${dividand[1]} =`;
      screenDisplay.innerText = parts[1] / Number(dividand[1]);
    }
  } else if (operator === "-") {
    if (firstTime === true) {
      upperScreenDisplay.innerText += " " + "=";
      screenDisplay.innerText = +values[0] - +values[1];
      firstTime = false;
    } else {
      let parts = upperScreenDisplay.innerText.split("="); // to split the current upperscreen innertext
      let dividand = parts[0].split("-"); //to split the current splitted upperscreen innertext
      if (parts[1] != 0) {
        upperScreenDisplay.innerText = `${parts[1]} - ${dividand[1]} =`;
        screenDisplay.innerText = +parts[1] - Number(dividand[1]);
      } else {
        upperScreenDisplay.innerText =
          "sorry, negative arithmetic is a work in progess";
        return;
      }
    }
  } else if (operator === "*") {
    if (firstTime === true) {
      upperScreenDisplay.innerText += " " + "=";
      screenDisplay.innerText = +values[0] * +values[1];
      firstTime = false;
    } else {
      let parts = upperScreenDisplay.innerText.split("="); // to split the current upperscreen innertext
      let dividand = parts[0].split("*"); //to split the current innertext
      upperScreenDisplay.innerText = `${parts[1]} * ${dividand[1]} =`;
      screenDisplay.innerText = +parts[1] * Number(dividand[1]);
    }
  } else if (operator === "+") {
    if (firstTime === true) {
      upperScreenDisplay.innerText += " " + "=";
      screenDisplay.innerText = +values[0] + +values[1];
      firstTime = false;
    } else {
      let parts = upperScreenDisplay.innerText.split("="); // to split the current upperscreen innertext
      let dividand = parts[0].split("+"); //to split the current innertext
      upperScreenDisplay.innerText = `${parts[1]} + ${dividand[1]} =`;
      screenDisplay.innerText = +parts[1] + Number(dividand[1]);
    }
  }
}

function clearScreen() {
  repition = 0;
  screenDisplay.innerText = 0;
  upperScreenDisplay.innerText = "";
}

function percentDiv() {
  repition = 0;
  canPerformOperation = true;
  if (
    upperScreenDisplay.innerText === "" ||
    +upperScreenDisplay.innerText === 0
  ) {
    upperScreenDisplay.innerText = 0;
    screenDisplay.innerText = 0;
    return;
  } else {
    upperScreenDisplay.innerText = screenDisplay.innerText / 100;
    screenDisplay.innerText = screenDisplay.innerText / 100;
  }
}

function squareRoot() {
  reset = true;
  upperScreenDisplay.innerText = `√(${screenDisplay.innerText})`;
  screenDisplay.innerText = Math.sqrt(+screenDisplay.innerText);
}

function square() {
  reset = true;
  upperScreenDisplay.innerText = `sqr(${screenDisplay.innerText})`;
  screenDisplay.innerText = Number(screenDisplay.innerText) ** 2;
}

function oneOverX() {
  reset = true;
  upperScreenDisplay.innerText = `1/(${screenDisplay.innerText})`;
  if (screenDisplay.innerText !== "0") {
    screenDisplay.innerText = 1 / screenDisplay.innerText;
  } else {
    screenDisplay.innerText = "Cannot divide by zero";
  }
}

function negate() {
  reset = true;
  screenDisplay.innerText = `-${screenDisplay.innerText}`;
}

function backSpaceAll() {
  repition = 0;
  if (
    upperScreenDisplay.innerText.includes("=") ||
    upperScreenDisplay.innerText == screenDisplay.innerText ||
    screenDisplay.innerText === "Cannot divide by zero"
  ) {
    screenDisplay.innerText = 0;
    upperScreenDisplay.innerText = "";
  } else {
    screenDisplay.innerText = 0;
  }
}

function backSpace() {
  let delArray = screenDisplay.innerText.split("");
  delArray.pop();
  if (delArray.length > 0) {
    screenDisplay.innerText = delArray.join("");
  } else {
    screenDisplay.innerText = "0";
  }
}
