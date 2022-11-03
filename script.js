const playButton = document.getElementById('play');
const eleSquares = document.querySelector('.box');
let victory = []

// INIZIO GIOCO
playButton.addEventListener('click', function() {

    //PULIZIA PER NUOVA PARTITA
    eleSquares.innerHTML = "";

    // SCELTA DIFFICOLTA'
    const howMany = document.getElementById("difficulty").value;   //qui assegniamo a "howMany" un valore di 100, 81 o 49, preso direttamente dal select nell'HTML

    // CREAZIONE E GRANDEZZA QUADRATI
    for (let i = 1; i <= howMany; i++) {   //questo for avviene tante volte quanto il numero di celle (howMany)

        if (howMany == 100){
            eleSquares.innerHTML += `<div class="sq easy">${i}</div>`;   //creo il div con la classe .sq già dentro  (la classe .sq ci servirà dopo per creare un array con tutti i quadratini)
        }
        else if (howMany == 81){
            eleSquares.innerHTML += `<div class="sq medium">${i}</div>`;   //easy, medium e hard servono solo per dare una grandezza ai qudratini che ho già impostato nel CSS
        }
        else if (howMany == 49){
            eleSquares.innerHTML += `<div class="sq hard">${i}</div>`;
        }  
    }

    // MINE RANDOM
    let mines = [];   //array per le mine
    const howManyMines = 16;   //numero di mine (si può cambiare)

    while(mines.length < howManyMines) {   //questo while va avanti finché non ha elementi pari al numero di mine (howManyMines)
        let numMina = Math.floor(Math.random() * howMany) + 1;
        if(mines.indexOf(numMina) === -1) {   //controllo per vedere se un numero è già uscito
            mines.push(numMina);   //solo se il numero non è già uscito viene pushato all'interno dell'array per le mine
        }
    }

    // SELEZIONE QUADRATINI
    const square = document.querySelectorAll('.sq');   //array per TUTTI i quadratini
    
    for (let i = 0; i < howMany; i++) {   //for per selezionare un quadratino
        square[i].addEventListener('click', 
            function() {
                square[i].classList.add('selected');  //ho usato add e non toggle perché nel campo minato non si torna indietro >:)
                console.log("Hai selezionato " + (i+1));
            }
        )
    }
    
    // SELEZIONE MINA
    for (let i = 0; i < howMany; i++) {   //questo for avviene tante volte quanto il numero di quadratini (howMany)
        square[i].addEventListener('click', 
            function() {
                let victory = document.querySelectorAll('.selected');   //questo serve per contare il punteggio finale
                if(mines.includes(i+1)) {
                    for(i=0; i<howManyMines; i++) {   // questo for avviene tante volte quanto il numeri di mine (howManyMines)
                        square[mines[i]-1].classList.add('esplosa');   //seleziona TUTTE le mine quando ne viene cliccata una
                    }
                    eleSquares.innerHTML += `<div class="endgame"> <div>Hai perso!</div> <div class="score">Punteggio: ${victory.length - 1}</div> </div>`;  //schermata finale
                }
            }
        )
    }

    // VITTORIA
    for (let i = 0; i < howMany; i++) {
        square[i].addEventListener('click', 
            function() {
                let victory = document.querySelectorAll('.selected');   //questo serve per contare il punteggio finale e controllare se si ha vinto (nel prossimo if)
                if(victory.length === howMany - howManyMines && document.querySelectorAll('.esplosa').length === 0){   //controlla se tutte le caselle sono state selezionate e se non ci sono mine esplose (il controllo per le mine serve nel caso in cui selezioni una mina proprio come ultima scelta prima di vincere)
                    for(i=0; i<howManyMines; i++) {
                        square[mines[i]-1].classList.add('disinnescata');   //rende tutte le mine verdi nel caso di vittoria
                    }
                    eleSquares.innerHTML += `<div class="endgame"> <div>Hai vinto!</div> <div class="score">Punteggio: ${victory.length}</div> </div>`;   //schermata finale
                }
            }
        )
    }

    // MOSTRA MINE
    const showButton = document.getElementById('show');
    showButton.addEventListener('click', 
        function() {
            for(i=0; i<howManyMines; i++) {   //seleziona TUTTE le mine
                square[mines[i]-1].classList.toggle('mostra-mine');   
            }
        }
    )

});