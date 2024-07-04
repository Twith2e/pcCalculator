let screenDisplay = document.getElementById("screen-display");
let upperScreenDisplay = document.getElementById("upper-display");
let calcHistory = [];
let doneCalc = false;
let calcFirst = false;
let reset = false;
let repition = 0;
let firstTime = true;
let specialFuncs = false;

function selectedBtn(button) {
  specialFuncs = false;
  if (button.value === ".") {
    screenDisplay.innerText += ".";
    return;
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
  if (calcFirst === false) {
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

  if (specialFuncs === true) {
    upperScreenDisplay.innerText = screenDisplay.innerText + "=";
    return;
  }

  if (upperScreenDisplay.innerText.startsWith("-")) {
    upperScreenDisplay.innerText += ` ${screenDisplay.innerText}`;
    parts = upperScreenDisplay.innerText.slice(1).split(/([\/\+\-\*])/); // Split the string excluding the first character
    parts[0] = "-" + parts[0]; // Add the initial '-' back to the first number
  } else {
    upperScreenDisplay.innerText += ` ${screenDisplay.innerText}`;
    parts = upperScreenDisplay.innerText.split(/([\/\+\-\*])/); // Split the string normally if it does not start with '-'
  }
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
      calcHistory.push({
        math: upperScreenDisplay.innerText,
        answer: screenDisplay.innerText,
      });
      displayHistory();
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
  calcHistory.push({
    math: upperScreenDisplay.innerText,
    answer: screenDisplay.innerText,
  });
  displayHistory();
  console.log(calcHistory);
}

function clearScreen() {
  repition = 0;
  screenDisplay.innerText = 0;
  upperScreenDisplay.innerText = "";
}

function percentDiv() {
  specialFuncs = true;
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
  calcHistory.push({
    math: upperScreenDisplay.innerText,
    answer: screenDisplay.innerText,
  });
  displayHistory();
}

function squareRoot() {
  specialFuncs = true;
  reset = true;
  upperScreenDisplay.innerText = `√(${screenDisplay.innerText})`;
  screenDisplay.innerText = Math.sqrt(+screenDisplay.innerText);
  calcHistory.push({
    math: upperScreenDisplay.innerText,
    answer: screenDisplay.innerText,
  });
  displayHistory();
}

function square() {
  specialFuncs = true;
  reset = true;
  upperScreenDisplay.innerText = `sqr(${screenDisplay.innerText})`;
  screenDisplay.innerText = Number(screenDisplay.innerText) ** 2;
  calcHistory.push({
    math: upperScreenDisplay.innerText,
    answer: screenDisplay.innerText,
  });
  displayHistory();
}

function oneOverX() {
  specialFuncs = true;
  reset = true;
  if (screenDisplay.innerText !== "0") {
    if (screenDisplay.innerText !== "Cannot divide by zero") {
      upperScreenDisplay.innerText = `1/(${screenDisplay.innerText})`;
      screenDisplay.innerText = 1 / screenDisplay.innerText;
      return;
    }
  } else {
    screenDisplay.innerText = "Cannot divide by zero";
  }
  calcHistory.push({
    math: upperScreenDisplay.innerText,
    answer: screenDisplay.innerText,
  });
  displayHistory();
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
  if (doneCalc === true) {
    upperScreenDisplay.innerText = "";
    doneCalc = false;
    return;
  }
  let delArray = screenDisplay.innerText.split("");
  delArray.pop();
  if (delArray.length > 0) {
    screenDisplay.innerText = delArray.join("");
  } else {
    screenDisplay.innerText = "0";
  }
}

function displayHistory() {
  historyList.innerHTML = "";
  calcHistory.forEach((solution) => {
    historyList.innerHTML += `<div class="solution-list"><p class="top">${solution.math}</p><p class="bottom">${solution.answer}</p></div>`;
  });
  deleteList.style.display = "block";
}

function deleteHistory() {
  historyList.innerHTML = "There's no history yet.";
  historyList.style.color = "white";
}

// function showHistory() {
//   historyEmpty.style.display = "block";
//   historyDefaultText.style.display = "block";
//   historyList.style.display = "block";
//   memoryDefaultText.style.display = "none";
//   memoryEmpty.style.display = "none";
// }

// function showMemory() {
//   historyEmpty.style.display = "none";
//   historyDefaultText.style.display = "none";
//   historyList.style.display = "none";
//   memoryDefaultText.style.display = "block";
//   memoryEmpty.style.display = "block";
// }
