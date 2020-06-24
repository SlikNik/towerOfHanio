// Global variables
let gameArea = document.getElementById("gameArea") //grab game area
const tower1 = document.getElementById("tower1") //grab tower1
const tower2 = document.getElementById("tower2") //grab tower2
const tower3 = document.getElementById("tower3") //grab tower3
const holder = document.getElementById("holder") //grab holder for results so show above waiting disc holder
const discHolder = document.getElementById("discHolder") //grab waiting disc holder
const moves = document.getElementById('moves') //grab moves div
let moveNum = document.querySelector(".moves") //grabs moves span
let valueSelected = 0 //this is the number of disc user selects always starts off at 0
let mode = false //here false means put down and true means pick up
let currentDisc = '' //this will be the disc that is pick up waiting to be put down


//below is only happens when page first loads; this function adds the selected disc number to screen
document.getElementById("selected").onclick = function(){
    gameArea.style.display = 'flex'; //turn display back on
    holder.style.display = 'block'; //turn display back on
    moveNum.style.display = "block"; //turn display back on
    let selectElement = document.getElementById("discAmount"); //grabs select tag by id
    // below gets selected option value and convert to string
    //.options allows us to have an array of options
    //.selectedIndex gives us the option with the check index
    //.value allows us to get that value that was set in HTML
    // had to parseInt due to type being a string
    valueSelected = parseInt(selectElement.options[selectElement.selectedIndex].value); 
    //below uses the valueSelected to create the correct amount of disc and append them to tower1
    for(let i = 1; i <= valueSelected; i++){
        let newDiv = document.createElement("div")
        newDiv.className = "disc"
        newDiv.id =`disc${i}`
        tower1.appendChild(newDiv)
    }
}

//below is listening for reset match button; 
//this function empties towers; 
//adds the previous disc  number to screen
document.getElementById("resetGame").onclick = function(){
    let results = document.createElement('p')
    results.innerHTML ="It is sometime wise to return to the beginning"
    results.style.color = "yellow"
    results.style.width = "40%"
    holder.prepend(results)
    //below allows the changes above to be seen for 2.25 secs before clearing
    //and re-adding previous selected disc amount
    setTimeout(function(){ 
        holder.removeChild(results)
        tower1.innerHTML = ""; 
        tower2.innerHTML = ""; 
        tower3.innerHTML = ""; 
        discHolder.innerHTML = "";
        moves.innerHTML = 0;
        for(let i = 1; i <= valueSelected; i++){
            let newDiv = document.createElement("div")
            newDiv.className = "disc"
            newDiv.id =`disc${i}`
            tower1.appendChild(newDiv)
        }
    }, 2250);
}

//below is listening for end game button;
// this function reloads page
document.getElementById("endGame").onclick = function(){
    let results = document.createElement('p')
    results.innerHTML ="Sometimes we must end a mission before it ends us"
    results.style.color = "yellow"
    results.style.width = "40%"
    holder.prepend(results)
    //below allows the changes above to be seen for 2.25 secs before reloading page
    setTimeout(function(){ 
        holder.removeChild(results)
        resetWindow()
    }, 2250);
}

//Below each tower is listening for click event 
//and then grabs available last child if in pick up mode
//if in put down mode adds disc from holder
tower1.addEventListener('click', () => {
    mode = !mode //change mode 
    play(tower1) 
})
tower2.addEventListener('click', () => {
    mode = !mode //change mode
    play(tower2) 
})
tower3.addEventListener('click', () => {
    mode = !mode //change mode
    play(tower3) 
})

//Below is the function for ending the game 
function resetWindow(){
    location.reload()
}

//Below is the function for playing the game each tower calls it
function play(tower){
    // console.log(mode)
    //grabs the given tower first child due to css and using column and not column reverse
    let towerLastDisc = tower.firstElementChild
    //if mode is true we are picking  up
    if(mode === true){
        if(tower.hasChildNodes()){
            currentDisc = document.getElementById(towerLastDisc.id)
            console.log(currentDisc)
            tower.removeChild(towerLastDisc)
            discHolder.appendChild(currentDisc)
        }else{ //tower has no ChildNodes 
            mode = !mode //change mode
            //sending waring to user
            let results = document.createElement('p')
            results.innerHTML ="You are in pick up mode. Please click a tower to pick up from."
            results.style.color = "yellow"
            results.style.width = "40%"
            //had to use prepend because of direction column 
            holder.prepend(results)
            setTimeout(function(){ 
                holder.removeChild(results)
            }, 2500);
        }
    }else{ //mode is in put down
        moves.innerHTML = parseInt(moves.innerHTML) + 1 //add to number of moves now
        // console.log(tower.childElementCount)
        if(tower.childElementCount > 0){ //if current tower has children
            if(towerLastDisc.offsetWidth > currentDisc.offsetWidth){ //if the current tower last disc is greater than current disc
                //OffsetWidth was used to get width from css
                tower.prepend(currentDisc) //add current disc
                if(tower3.childElementCount === valueSelected){ //this checks for the game to be won after ever drop
                    let results = document.createElement('p')
                    results.innerHTML =`Conragts Young Grasshoper! You have won the match in ${parseInt(moves.innerHTML)} moves!`
                    results.style.color = "yellow"
                    results.style.width = "40%"
                    holder.prepend(results)
                    setTimeout(function(){ 
                        holder.removeChild(results)
                        resetWindow()
                    }, 2500);
                }
            }else{ //if current tower has no children 
                mode = !mode //change mode
                //send warning message
                let results = document.createElement('p')
                results.innerHTML ="You can only the place on current disc on a wider disc."
                results.style.color = "yellow"  
                results.style.width = "40%"
                holder.prepend(results)
                setTimeout(function(){ 
                    holder.removeChild(results)
                }, 2500);
            }
        }else{ //if tower has no children
            tower.prepend(currentDisc) //add current disc
        }
    }
}
