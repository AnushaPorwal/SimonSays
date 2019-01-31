var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(function (){
  if(!gameStarted)
  {
    $("h1").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNum = (Math.floor((Math.random()*4)));
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

$("button").click(function handler(){
  var userChosenColor = $(this).attr('id');
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress (currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over, press any key to restart");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
  }
}
