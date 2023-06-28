var buttonColors = ["red", "blue", "green", "yellow"];//,"orange","white"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; 
var enableButton = false;
var animationDelay = 150;
var levelDelay = 700;
var buttonShowDelay = 400;
const timer = ms => new Promise(res => setTimeout(res, ms)) 

async function nextSequenze(){
    //await timer(150);
    enableButton = false;
    userClickedPattern = [];

    var randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)]
    gamePattern.push(randomColor);
    level++;
    $("#level-title").text("Level " + level)
    for (const game of gamePattern){
        await $(".btn." + game).fadeOut(animationDelay).fadeIn(animationDelay);
        await playSound(game);
        await timer(buttonShowDelay);
    }
    enableButton = true;
}

function handleUserClick(){
    if(enableButton){
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor)
        animateUserPress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
}
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequenze();
            }, levelDelay);
        }
        return;
    }
    gameOver();
}
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
        startOver();
    }, animationDelay);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    enableButton = false;
    $("#level-title").text("Press A Key to Start")
}
async function playSound(name){
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

function animateUserPress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(() => { 
        $("#" + color).removeClass("pressed"); 
    },animationDelay);
}

$(".btn").click(handleUserClick);

$(document).on("keypress", function() {
    if(level == 0){
        setTimeout(() => {
            nextSequenze();
        }, levelDelay);
    }
});