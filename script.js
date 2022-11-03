const playButton = document.getElementById('play');
const eleSquares = document.querySelector('.box');
let victory = []

// INIZIO GIOCO
playButton.addEventListener('click', function() {

    //PULIZIA PER NUOVA PARTITA
    eleSquares.innerHTML = "";  

    // SCELTA DIFFICOLTA'
    const howMany = document.getElementById("difficulty").value;

    // CREAZIONE E GRANDEZZA QUADRATI
    for (let i = 1; i <= howMany; i++) {

        if (howMany == 100){
            eleSquares.innerHTML += `<div class="sq easy">${i}</div>`;
        }
        else if (howMany == 81){
            eleSquares.innerHTML += `<div class="sq medium">${i}</div>`;
        }
        else if (howMany == 49){
            eleSquares.innerHTML += `<div class="sq hard">${i}</div>`;
        }  
    }

    // MINE RANDOM
    let mines = [];
    const howManyMines = 16;

    while(mines.length < howManyMines) {
        let numMina = Math.floor(Math.random() * howMany) + 1;
        if(mines.indexOf(numMina) === -1) {
            mines.push(numMina);
        }
    }

    // SELEZIONE QUADRATINI
    const square = document.querySelectorAll('.sq');
    
    for (let i = 0; i < howMany; i++) {
        square[i].addEventListener('click', 
            function() {
                square[i].classList.add('selected');
                console.log("Hai selezionato " + (i+1));
            }
        )
    }
    
    // SELEZIONE MINA
    for (let i = 0; i < howMany; i++) {
        square[i].addEventListener('click', 
            function() {
                let victory = document.querySelectorAll('.selected');
                if(mines.includes(i+1)) {
                    for(i=0; i<howManyMines; i++) {
                        square[mines[i]-1].classList.toggle('esplosa');
                    }
                    eleSquares.innerHTML += `<div class="endgame"> <div>Hai perso!</div> <div class="score">Punteggio: ${victory.length - 1}</div> </div>`;
                }
            }
        )
    }

    // VITTORIA
    for (let i = 0; i < howMany; i++) {
        square[i].addEventListener('click', 
            function() {
                let victory = document.querySelectorAll('.selected');
                if(victory.length === howMany - howManyMines && document.querySelectorAll('.esplosa').length === 0){
                    for(i=0; i<howManyMines; i++) {
                        square[mines[i]-1].classList.toggle('disinnescata');
                    }
                    eleSquares.innerHTML += `<div class="endgame"> <div>Hai vinto!</div> <div class="score">Punteggio: ${victory.length}</div> </div>`;
                }
            }
        )
    }

    // MOSTRA MINE
    const showButton = document.getElementById('show');
    showButton.addEventListener('click', 
        function() {
            for(i=0; i<howManyMines; i++) {
                square[mines[i]-1].classList.toggle('mostra-mine');
            }
        }
    )

});