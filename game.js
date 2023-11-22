//declaring variables
var candy=["blue-candy","green-candy","orange-candy","purple-candy","red-candy","yellow-candy"]
var board=[]
var rows=9
var column=9
var score=0;
var currentTile
var newTile
const gameScreen=document.getElementById("game-screen")

window.onload=function(){
    playGame()
    window.setInterval(function(){
        crushCandy()

    },100)
}

//making main play game function to perform different game tasks
function playGame(){
    for (let i=0;i<rows+1;i++){
        let arr=[]
        for (let j=0;j<column;j++){
            let tile =document.createElement("img")
            tile.id=i.toString()+"-"+j.toString()
            //making 9*9 grid and adding random candies to it 
            tile.src="assets/candy/"+ generateCandy()+".png"

            //making the image draggable
            tile.addEventListener("dragstart", dragStart)
            tile.addEventListener("dragover", dragOver) 
            tile.addEventListener("dragenter", dragEnter)
            tile.addEventListener("dragleave", dragLeave) 
            tile.addEventListener("drop", dragDrop)
            tile.addEventListener("dragend", dragEnd) 

            gameScreen.append(tile)
            arr.push(tile)

        }
        board.push(arr)
    }
}


//dragstart function to initialize the drag process
function dragStart(){
    currentTile=this

}

//dragover function to drag the candy
function dragOver(elem){
    elem.preventDefault();
}

//dragenter function to drag candy to new tile
function dragEnter(elem){
    elem.preventDefault()
}

//dragleave function to leave the old candy into new tile
function dragLeave(elem){
    elem.preventDefault()
}

//dragdrop function to drop the candy to another candy
function dragDrop(){
    newTile=this
}

//dragend function to crush and swap the candy
function dragEnd(){
    //getting coordinates of current tile and new tile
    let currentCoord= currentTile.id.split("-")
    let r1=parseInt(currentCoord[0])
    let c1=parseInt(currentCoord[1])

    let newCoord=newTile.id.split("-")
    let r2=parseInt(newCoord[0])
    let c2=parseInt(newCoord[1])

    //making swap feature availabe to adjacent tiles only
    let Left=c2==c1-1 && r1==r2
    let Right=c2==c1+1 && r1==r2

    let Up=r2==r1-1 && c1==c2
    let Down=r2==r1+1 && c1==c2

    let adjacent=Left || Right || Up || Down
    if(adjacent){
        //changing the images of the rows and columns
        let currentImg=currentTile.src
        let newImg=newTile.src
        currentTile.src=newImg
        newTile.src=currentImg
    }
    else{
        alert("You can only swap adjacent 🍬!!!!")
    }
    

}

//function for crushing candies
function crushCandy(){
    crushThree()
}

//function to crush three candies
function crushThree(){
    //for checking rows
    for (let r=0;r<rows;r++){
        for (let c=0;c<column-2;c++){
            let c1=board[r][c]
            let c2=board[r][c+1]
            let c3=board[r][c+2]
            if (c1.src==c2.src && c2.src==c3.src && !c1.src.includes("blank")){
                c1.src="assets/candy/bluebg.png"
                c2.src="assets/candy/bluebg.png"
                c3.src="assets/candy/bluebg.png"
            }
        }
    }
    //for checking columns 
    for (let c=0;c<column;c++) {
        for (let r=0;r<rows-2;r++) {
            let c1=board[r][c];
            let c2=board[r+1][c];
            let c3=board[r+2][c];
            //changing the crushed candies to 
            if (c1.src == c2.src && c2.src == c3.src && !c1.src.includes("blank")) {
                c1.src="assets/candy/bluebg.png"
                c2.src="assets/candy/bluebg.png"
                c3.src="assets/candy/bluebg.png"
            }
        }
    }
}
//creating function to generate random candies
function generateCandy(){
    return candy[Math.floor(Math.random()*candy.length)]


}