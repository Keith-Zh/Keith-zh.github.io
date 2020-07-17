// alert("This JS file is working!");

// Variables & Arrays
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var levelNum = -1;

// Clicking Button
function userClick() {
  $(".btn").on("click", function() {
    if (levelNum > -1) {
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);

      //Check if the last user input match the corresponding answer in the array.
      if (PatternMatched(userClickedPattern)) {
        // Check if the user input is all matched witht he items in answer array.
        if (userClickedPattern.length == gamePattern.length) {
          // if so, give the new hints
          setTimeout(function(){nextSequence();}, 1000);
        }
      }
    //If any input didn't match, end the game.
    else {
      losingTheGame();
    }
    console.log("User Pattern: " + userClickedPattern)
    // console.log(userClickedPattern);
  }});
}

//Check if the User Clicked Pattern match the Game Pattern
function PatternMatched(CurClickedSequence) {
  // Check if the last user input match the corresponding answer in the array.
  if (CurClickedSequence[CurClickedSequence.length - 1] == gamePattern[CurClickedSequence.length - 1]) {
      return true;
    } else {
      $("body").addClass("game-over")
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      return false;
    }
  }

  //Giving the Instruction and Updating the h1
  function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    levelNum++;
    $("h1").text("Level " + levelNum);
    console.log("Game Pattern: " + gamePattern);
  }

  //PLaying Sound
  function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }

  //Keypress Animation
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  //Starting the game
  function startingGame() {
    document.addEventListener("click", function() {
      if (levelNum == -1) {
        nextSequence();
      }
    });
  }

  function losingTheGame() {
    levelNum = -1;
    $("h1").text("Game Over, Press Any Key to Start");
    playSound("wrong");

    gamePattern = [];
    userClickedPattern = [];
  }

  startingGame();
  userClick();
