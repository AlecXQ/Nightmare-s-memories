
var cartas = document.querySelectorAll('.memory-card');


var hasFlippedCard = false;
var lockBoard = false
var primeraCarta, segundaCarta;


function giro(){
    if(lockBoard) return;
    if(this === primeraCarta) return;

    this.classList.add('flip')
    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        primeraCarta = this;
        return;
    }
        //second card
        segundaCarta = this;

        pareja();
}

function pareja(){
       //do cards match?
       let isMatch = primeraCarta.dataset.framework ===
        segundaCarta.dataset.framework;
       
        isMatch ? disableCards() : unflipCards();   
}



function disableCards(){
    primeraCarta.removeEventListener('click',giro);
    segundaCarta.removeEventListener('click',giro);
    resetBoard();
}



function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        primeraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');

        resetBoard();
       }, 1500);
}



function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [primeraCarta,segundaCarta] = [null, null];
}





(function shuffle(){
    cartas.forEach(carta =>{
        let randomPos = Math.floor(Math.random() * 12)
        carta.style.order = randomPos;
    });
})();



cartas.forEach(carta => carta.addEventListener('click', giro));