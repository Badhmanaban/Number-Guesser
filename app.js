// Game Values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const UIgame = document.getElementById("game"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UIguessBtn = document.getElementById("guess-btn"),
  UIguessInput = document.getElementById("guess-input"),
  UImessage = document.querySelector(".message");

//Assign UI min and max

UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play Agin
UIgame.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-agin") {
    window.location.reload();
  }
});

// Listen for Guess
UIguessBtn.addEventListener("click", function () {
  let guess = parseInt(UIguessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a number between ${min} and ${max}`, "red");
  } else {
    // Check Win
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
      //   Wrong Number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        //   Game over - lost
        gameOver(
          false,
          `Game over, you lost. The correct number was ${winningNum}`
        );
      } else {
        //   Game continue - answer wrong
        UIguessInput.style.borderColor = "red";

        //Clear Input
        UIguessInput.value = "";

        // Tell user its wrong Answer
        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  UIguessInput.disabled = true;
  //   Change the border color
  UIguessInput.style.borderColor = color;
  // Set text color
  UImessage.style.color = color;
  //   Set MEssage
  setMessage(msg);

  // Let Play Agin
  UIguessBtn.value = "Play Agin";
  UIguessBtn.className += "play-agin";
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}
