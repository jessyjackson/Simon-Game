var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequenze(){

    var random = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[random];
    gamePattern.push(randomColor);
    $(".btn." + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    animateUserPress(randomColor);
}
function handleUserClick(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animateUserPress(userChosenColor);
    //console.log(userClickedPattern);
}

function playSound(color){
    var audio = new Audio('sounds/' + color + ".mp3");
    audio.play();
}

function animateUserPress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(() => { 
        $("#" + color).removeClass("pressed"); 
    },100);
}
$(".btn").click(handleUserClick);
