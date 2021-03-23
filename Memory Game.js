const gameContainer = document.getElementById("game");
let flipCount = 0;
let cardsMatched = 0;

const COLORS = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add('notM', color);
    //newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

gameContainer.addEventListener("click", handleCardClick);
function handleCardClick(event) {
  if(event.target.id !== 'game'){
    if(event.target.classList.contains('visible')){
      return;
    }
    flipCount++;
    if(flipCount>2){
      return;
    }
    event.target.classList.add('visible');
    if(flipCount === 2){
      isPair();
    }
  }
}

function isPair(){
  const curPair = gameContainer.querySelectorAll('.notM.visible');
  if(curPair[0].className === curPair[1].className){
    console.log("Pair!");
    setTimeout(function(){
      curPair[0].classList.remove('notM');
      curPair[1].classList.remove('notM');
      cardsMatched += 2;
      if (cardsMatched === COLORS.length) alert("You Won!");
      flipCount = 0;
    }, 250);
  }
  else{
    console.log("Not Pair!");
    setTimeout(function(){
      curPair[0].classList.remove('visible');
      curPair[1].classList.remove('visible');
      flipCount = 0;
    }, 1000);
  }
}

// when the DOM loads
window.addEventListener('load', function(){
  createDivsForColors(shuffledColors);
});