let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function(){
    setGame();
}

function setGame(){
    // set up the grid for the game board in html
    for(let i = 0; i < 9; i++){
        // <div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();

        tile.addEventListener("click", selectTile); // to make every tile clickable

        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){

    // it still continues/resumes the game even after GAME is OVER 
    // if the game is over we don't want to set the mole anymore
    if(gameOver){
        return;
    }

    // so that after every 2 sec previous mole gets removed (in order to make another mole visible with no extra moles)
    if(currMoleTile){
        currMoleTile.innerHTML = "";
    }

    let moleImg = document.createElement("img");
    moleImg.src = "./images/monty-mole.png";

    let num = getRandomTile();
    // BUT THE PROBLEM IS Plant and Mole MAY COLLIDE in same pipe
    //Solution: if there's a conflict we're only gonna show either the mole or the plant
    if(currPlantTile && currPlantTile.id == num){
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(moleImg);
}

function setPlant(){
    
    // it still continues/resumes the game even after GAME is OVER 
    // if the game is over we don't want to set the mole anymore
    if(gameOver){
        return;
    }

    if(currPlantTile){
        currPlantTile.innerHTML = "";
    }

    let plantImg = document.createElement("img");
    plantImg.src = "./images/piranha-plant.png";

    let num = getRandomTile();
    // BUT THE PROBLEM IS Plant and Mole MAY COLLIDE in same pipe
    //Solution: if there's a conflict we're only gonna show either the mole or the plant
    if(currMoleTile && currMoleTile.id == num){
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plantImg);
}

function selectTile(){

    // it still continues/resumes the game even after GAME is OVER 
    // if the game is over we don't want to set the mole anymore
    if(gameOver){ // The player should not be able to select the tile if the GAME is OVER
        return;
    }

    if(this == currMoleTile){ // this means: tile that was clicked
        score += 10;
        document.getElementById("score").innerText = score.toString(); // updates the score
    }
    else if(this == currPlantTile){
        document.getElementById("score").innerText = "GAME OVER: Score is " + score.toString();
        gameOver = true;
    }
}


let leftOver = 60;

let timeLeft = setInterval(function (){

    if(gameOver){ 
        clearInterval(timeLeft);
        document.getElementById("timer").innerHTML = "⏳Time Left: " + leftOver + " seconds";
    }

    document.getElementById("timer").innerHTML = "⏳Time Left: " + leftOver + " seconds";
    leftOver--;
      
    if(leftOver < 0){
        clearInterval(timeLeft);
        document.getElementById("timer").innerHTML = "Time's Up!"
        document.getElementById("timer").style.color = "red";

        document.getElementById("score").innerText = "GAME OVER: Your score is " + score.toString();
        gameOver = true;
    }
}, 1000);


