/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScores, activePlayer, gamePlaying, dice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //Random number 

        dice = Math.floor(Math.random() * 6) + 1;

        //Display the corresponding dice
        var diceimg = document.querySelector('.dice');
        diceimg.style.display = 'block';
        diceimg.src = 'dice-' + dice + '.png';
        

        // update round score if number is NOT 1
        if(dice === 6 && prevRoll === 6){
            //Player loses score
            score[activePlayer]=0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if(dice >1){
            //ADD score
            roundScore += dice;
            document.querySelector('#currscore-' + activePlayer).textContent =  roundScore;
        }
        else{
            //Next Player Turn
            nextPlayer();
        }
        
        prevRoll = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score of the player
        score[activePlayer] += roundScore;

        //Update UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        
        //Check if player won the game
        var input = document.querySelector('.limit').value;
        var winningScore;

        if(input){
           winningScore = input;
        }
        else{
            winningScore = 20;
        }

        if(score[activePlayer] >= winningScore){
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER!!';
            document.querySelector('.dice').style.display ='none';
            gamePlaying = false;
        }
        else{
            //NextPlayer
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    score = [0,0];
    roundScore =0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#currscore-0').textContent = '0';
    document.querySelector('#currscore-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector('.player1-panel').classList.remove('active');
    document.querySelector('.player2-panel').classList.remove('active');

    document.querySelector('.player1-panel').classList.add('active');
}

function nextPlayer(){
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScore = 0;

    document.getElementById('currscore-0').textContent ='0';
    document.getElementById('currscore-1').textContent ='0';

    document.querySelector('.player1-panel').classList.toggle('active');
    document.querySelector('.player2-panel').classList.toggle('active');
}

//CHALLENGE 1  :  PLAYER LOSES HIS ENTIRE SCORE IF DICE ROLLS 6 TWICE

