//Global variables
let time, interval  


//This function is called when game is started
const startGame = () => {
    //Stop any previous timers
    clearInterval(interval)

   //initialize time & ticker
    time = 30// TO DO: change back to 30
    interval = setInterval(tick, 1000) 
    //1000ms = 1s. This tick refers to function below

    //Add wire click event handlers 
    addWireClick()

    //display diff text on button 
    document.getElementById('start').textContent = "Restart!"

    //display a message for actively playing the game
    document.getElementById('message').textContent = 'Hurry up! ahh!'

    //make sure background is unexploded
    document.getElementsByTagName('body')[0].classList.remove('exploded')
    document.getElementsByTagName('body')[0].classList.add('unexploded')

    //play the siren sound
    document.getElementById('siren').play()
}

const tick = () => {
    console.log('tick', time)
    time -= 1
    document.getElementById('timer').textContent = time
    if(time === 5) {
        document.getElementById('timer').style.color = 'crimson'
    }
    else if (time <= 0 ) {
        loseGame()
    }
}


const addWireClick = () => {
    //grab all the images of wires
    let wireImages = document.querySelectorAll('#box img') //images are child of box
    //loop through each wire
    for(let i= 0; i < wireImages.length; i++) {
        //assign the listener => cutWire
        wireImages[i].addEventListener('click', cutWire)

        //decide whether wire should be cut
        let shouldBeCut = (Math.random() > 0.5).toString() //"true" or "false"
        wireImages[i].setAttribute('data-cut', shouldBeCut)
        console.log(wireImages[i])

        //ensure the uncut images are up
        wireImages[i].src =`./img/uncut-${wireImages[i].id}-wire.png`
    }
    //bonus: add erro checking
}
const removeWireClicks = () => {
    //grab all the images of wires
    let wireImages = document.querySelectorAll('#box img')
    //loop through each wire
    for (let i= 0; i < wireImages.length; i++){
        //assign the listener => cutWire
        wireImages[i].removeEventListener('click', cutWire)
    }
}

const cutWire = (e) => {
    //change the wire image to cut version
    e.target.src = `./img/cut-${e.target.id}-wire.png`

    //remove the event listener 
    e.target.removeEventListener('click', cutWire) //removes to node itself in dom

    //determine if that was a good wire 
    if (e.target.getAttribute('data-cut') === 'true') {
        //it was a good wire!
        document.getElementById('buzz').play()
        //set data-cut attribute to false
        e.target.setAttribute('data-cut', 'false')
        //TO DO: check win condition
        if (checkWin()) {
            winGame()
        }
    }
    else {
        //o no it was a bad wire!
        loseGame()
    }
}
//check if any wires are stil left that need to be cut
//yes-> false we haven't won yet
///no -> true, we win no wires to be cut
const checkWin = () => {
    //grab all the images ofo wires
    let wireImages = document.querySelectorAll('#box img')
    //looping through all the wire images
    for (let i = 0; i < wireImages.length; i++) {
        if (wireImages[i].getAttribute('data-cut') === 'true') {
            return false //BREAKS out of loop & function
        }
    }
    //i got through the whole loop, nothing was "true"
    return true
}
const endGame = (message) => {
    //stop the timer
    clearInterval(interval)

    //stop the siren
    document.getElementById('siren').pause()

    //display play again on the button
    document.getElementById('start').textContent = 'Play again'

    //display a message for game status 
    document.getElementById('message').textContent = message
    // remove old click events
    removeWireClicks()
}
const winGame = () => {
    //do stuff to end the game; stop timers
    endGame('YOU Win')

    //play cheer shound, followed by theme song
    let cheer = document.getElementById('cheer')
    cheer.addEventListener('ended', () => {
        document.getElementById('theme').play()
    })
    cheer.play()
}
const loseGame = () => {
    //do stuff to end game, stop timers, tec
    endGame('Boom! you have failed')

    //change the background to the explosion
    document.getElementsByTagName('body')[0].classList.remove('unexploded')
    document.getElementsByTagName('body')[0].classList.add('exploded')

    //play the explosion sound
    document.getElementById('explode').play()
    //display a message for failure
}

//start the game
document.getElementById('start').addEventListener('click', startGame)