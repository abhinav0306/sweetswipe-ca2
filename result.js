//adding functionality to restart button and redirecting it to next page
var restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', function() {
    window.location.href = 'game.html';
    localStorage.removeItem("gameResult");
});

var homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
    localStorage.removeItem("nickName");
    localStorage.removeItem("gameResult");
    

});


// array for winning messages
const winningMessages = [
    "Congratulations! You won!",
    "Awesome job! You are a winner!",
    "Victory is yours! Well done!",
    "You're a champion! Great job!",
    "Fantastic! You've conquered the game!"
  ];
  
//array for losing messages
const losingMessages = [
    "Oops! You lost. Better luck next time!",
    "Don't worry, losing is a part of the game.",
    "It's okay, you'll get them next time!",
    "You gave it your best shot! Try again!",
    "Keep trying! Success is just around the corner."
  ];

// getting result from the game.js file by using local storage 
var resultmsgDoc = document.getElementById("message");
var result = localStorage.getItem("gameResult");
nickname=localStorage.getItem("nickName")
finalscore=localStorage.getItem("finalscore")


//displaying the respective message according to the result 
if (result === "win") {

  playBackgroundMusic()
    resultmsgDoc.innerHTML = "Hey👋🏻 "+ nickname + ", " +winningMessages[Math.floor(Math.random() * winningMessages.length)] + " You scored "+ finalscore+ " points🍬.";
}else if (result==="lost"){
    resultmsgDoc.textContent = "Hey "+ nickname + ", " +losingMessages[Math.floor(Math.random() * losingMessages.length)]+ " You scored "+ finalscore+ " points.🍬";
    console.log("lost")
}

//playing background music
function playBackgroundMusic() {
    var audio = document.getElementById('sugarcrush');
    audio.play();
  }





