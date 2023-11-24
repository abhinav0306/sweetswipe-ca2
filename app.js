
//adding functionality to play button and redirecting it to next page
var playButton = document.getElementById('playbtn');
playButton.addEventListener('click', function() {
  
    window.location.href = 'credentials.html';
    
});

//making backgroud music playable whenever page loads
function playBackgroundMusic() {
    var audio = document.getElementById('bgMusic');
    audio.play();
  }

window.onload=playBackgroundMusic();