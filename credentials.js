//adding functionality to start button and redirecting it to next page

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
        const selectedLevel = document.getElementById("level").value;
        const nicknameinp=document.getElementById("nickname")
        let targetValue;
        switch (selectedLevel) {
            case "easy":
                targetValue = 100;
                break;
            case "medium":
                targetValue = 150;
    
                break;
            case "hard":
                targetValue = 200;
                break;
            default:
                targetValue = 150; // Default value
        }
        //using localstorage to set item which will be used in game.js to show the target with the respective level selected
        localStorage.setItem("targetValue", targetValue);
        nickname=nicknameinp.value
        localStorage.setItem("nickName",nickname)
    });
});

