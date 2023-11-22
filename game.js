//declaring variables

const gamescreen=document.getElementById("game-screen")
const scoredoc=document.getElementById("score")
const highScoreDoc = document.getElementById("highscore"); 
const candy=["blue-candy","green-candy","orange-candy","purple-candy","red-candy","yellow-candy"]
var board=[];
var rows=9;
var columns=9;
var score=0;
var currentTile;
var newTile;
var moves=10
const movesDoc=document.getElementById("moves")



//calling required functions
document.addEventListener("DOMContentLoaded",function() {
    sweetStart();
    setInterval(function() {
        crushCandy();
        newCandyDisplay();
        generateCandy();
        updateHighScore();
        gameOver();
    },100);
    
});



const targetValue = localStorage.getItem("targetValue");
const targetElement = document.getElementById("targetscore");
targetElement.textContent = targetValue;



//making main play game function to perform different game tasks

function sweetStart() {
    for (let r=0;r<rows; r++) {
        let row=[];
        for (let c=0;c<columns; c++) {
            let tile=document.createElement("img");
            tile.id=r.toString()+"-"+c.toString();
            //making 9*9 grid and adding random candies to it 

            tile.src="assets/candy/"+displayRandomCandy()+".png";
            //making the image draggable            
            tile.addEventListener("dragstart",dragStart); 
            tile.addEventListener("dragover",dragOver);  
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop); 
            tile.addEventListener("dragend",dragEnd);

            gamescreen.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}
//dragstart function to initialize the drag process

function dragStart() {
    currentTile=this;
}

//dragover function to drag the candy
function dragOver(elem) {
    elem.preventDefault();
}

//dragenter function to drag candy to new tile

function dragEnter(elem) {
    elem.preventDefault();
}
//dragleave function to leave the old candy into new tile

function dragLeave(elem) {
    elem.preventDefault();
}

//dragdrop function to drop the candy to another candy
function dragDrop() {
    newTile=this;
}

//dragend function to crush and swap the candy

function dragEnd() {

    if (currentTile.src.includes("blank")||newTile.src.includes("blank")) {
        return;
    }
    //getting coordinates of current tile and new tile

    let currentCoord=currentTile.id.split("-"); 
    let r=parseInt(currentCoord[0]);
    let c=parseInt(currentCoord[1]);
    let newCoord=newTile.id.split("-");
    let r2=parseInt(newCoord[0]);
    let c2=parseInt(newCoord[1]);

    //making swap feature availabe to adjacent tiles only

    let Left=c2==c-1 && r==r2;
    let Right=c2==c+1 && r==r2;

    let Up=r2==r-1 && c==c2;
    let Down=r2==r+1 && c==c2;

    let nearBy=Left||Right||Up||Down;

    if (nearBy) {
        //changing the images of the rows and columns

        let currentImg=currentTile.src;
        let newImg=newTile.src;
        currentTile.src=newImg;
        newTile.src=currentImg;

        let valid=validMoveCheck();
        if (!valid) {
            let currentImg=currentTile.src;
            let newImg=newTile.src;
            currentTile.src=newImg;
            newTile.src=currentImg;    
        }
        else{
            moves--;
            movesDoc.innerText=moves;
            if(moves===0){
                location.href="result.html"
            }
        }
    }else{
        alert("You can only swap adjacent 🍬!!!!")
    }
}

//function for crushing candies

function crushCandy() {
    crushThree();
    scoredoc.innerText=score;
}

//function to crush three candies

function crushThree() {
    //for checking rows

    for (let r=0;r<rows; r++) {
        for (let c=0;c<columns-2; c++) {
            let c1=board[r][c];
            let c2=board[r][c+1];
            let c3=board[r][c+2];
            if (c1.src==c2.src && c2.src==c3.src && !c1.src.includes("blank")) {
                c1.src="assets/candy/blank.png";
                c2.src="assets/candy/blank.png"
                c3.src="assets/candy/blank.png"
                score+=10;
            }
        }
    }
    //for checking columns 

    for (let c=0;c<columns; c++) {
        for (let r=0;r<rows-2; r++) {
            let c1=board[r][c];
            let c2=board[r+1][c];
            let c3=board[r+2][c];
            //changing the crushed candies to 

            if (c1.src==c2.src && c2.src==c3.src && !c1.src.includes("blank")) {
                c1.src="assets/candy/blank.png"
                c2.src="assets/candy/blank.png"
                c3.src="assets/candy/blank.png"
                score+=10;
            }
        }
    }
}

//checking if the move is valid

function validMoveCheck() {
    for (let r=0;r<rows; r++) {
        for (let c=0;c<columns-2; c++) {
            let c1=board[r][c];
            let c2=board[r][c+1];
            let c3=board[r][c+2];

            if (c1.src==c2.src && c2.src==c3.src && !c1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c=0;c<columns; c++) {
        for (let r=0;r<rows-2; r++) {
            let c1=board[r][c];
            let c2=board[r+1][c];
            let c3=board[r+2][c];
            if (c1.src==c2.src && c2.src==c3.src && !c1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

//function for displaying new candies

function newCandyDisplay() {
    for (let c=0;c<columns; c++) {
        let ind=rows - 1;
        for (let r=columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src=board[r][c].src;
                ind -= 1;
            }
        }

        for (let r=ind; r >= 0; r--) {
            board[r][c].src="assets/candy/blank.png";
        }
    }
}
//creating function to generate candies
function generateCandy() {
    for (let c=0;c<columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src="assets/candy/"+displayRandomCandy()+".png";
        }
    }
}
//function for displaying random candies 
function displayRandomCandy() {
    return candy[Math.floor(Math.random() * candy.length)]; //0 - 5.99
}

//showing highscore using localstorage
let highScore = localStorage.getItem("highScore");
highScore = highScore ? parseInt(highScore) : 0;
highScoreDoc.innerText = highScore;
function updateHighScore() {
    //updating the high score if the current score is higher
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDoc.innerText = highScore;
    }
}


function gameOver(){
    if (score>=targetValue || moves<=0){
        location.href="result.html"
        
    }
    if(moves===0){
        location.href="result.html"
    }
}



