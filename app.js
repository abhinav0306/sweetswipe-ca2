//adding functionality to play button and redirecting it to next page
var playButton = document.getElementById('playbtn');
playButton.addEventListener('click', function() {
    window.location.href = 'credentials.html';
});

// function playBackgroundMusic() {
//     var audio = document.getElementById('bgMusic');
//     audio.play();
//   }

//   // Event listener to play the music when the page loads
// window.addEventListener('load', playBackgroundMusic); 