var players_score = 0;
var computers_score = 0; 
var deck; 

var players_hand;
var comp_hand;

var holdthese;

var num_of_cards;

var numOfPlayersAces = 0;
var numOfComputerAces = 0; 

window.onload = deal();


//Make Deck
function makeDeck(){
var cards = new Array();

	for(var i = 1; i<=13; i++){
		for (var j = 1; j<=4; j++){
		cards.push([i,j]); //push adds to end of cards array
		}
	}
	return cards;
}

//Shuffle Deck
function shuffle(deck){
	for(var k = 0; k < 1000; k++){
		var i = Math.floor(Math.random() * deck.length);
		var j = Math.floor(Math.random() * deck.length);

		var t = deck[i];
		deck[i] = deck[j];
		deck[j] = t
		}

		return deck;
	}

function createCardDiv(card){ 
	//for (var i = 0; i<cards.length; i++;){
		var div = document.createElement('div');
		div.setAttribute('class', 'card');

		var x = (card[0] - 1) * -73;
		var y = (card[1] - 1) * -98;

		div.style.backgroundPosition = x + 'px ' + y +'px';

		return div;
}

function drawPlayer(){

	var card = deck[num_of_cards++];
	var div = createCardDiv(card);

	document.getElementById('player-cards').appendChild(div);

	if(parseInt(card[0]) == 1){
		numOfPlayersAces++;
		players_score += 11;
	}
	else{
		players_score += card[0];
	}

	console.log(players_score + " " + numOfPlayersAces);

	while (players_score>21 && numOfPlayersAces >0){
		numOfPlayersAces--;
		players_score -=10;
	}

	if(players_score < 21)
		document.getElementById('player-score').innerHTML =  players_score;
	if(players_score == 21){
		document.getElementById('player-score').innerHTML = "BLACKJACK!";
		stay();
	}
	if(players_score > 21){
		document.getElementById('player-score').innerHTML = "You Busted!";
		stay();
	}

}

function drawComputer(){

	var counter = 1; 
	
	while(computer_score < 17){
		var card = deck[num_of_cards++];
		var div = createCardDiv(card);

		if(counter == 1){
			document.getElementById('computer-cards').appendChild(div);
			counter++;
		}
		else{
			document.getElementById('computer-cards').appendChild(div).style.display = "none";
		}


		if(parseInt(card[0]) == 1){
			numOfComputersAces++;
			computer_score += 11
		}
		else{
			computer_score += card[0];
		}

		while (computer_score>21 && numOfComputersAces >0){
			numOfComputersAces--;
			computer_score -=10;
		}
	}


}

function stay(){
		var computerDisplay = document.getElementById('computer-score');
		var winner = document.getElementById('status');


		computerDisplay.innerHTML = computer_score;
		$('#computer-cards').children().css("display", "inline-block");

		$('#deal').attr('disabled', false);
		$('#hit').attr('disabled', true);
		$('#stay').attr('disabled', true);

		if(computer_score == players_score || computer_score == 21 || (computer_score > players_score && computer_score < 21) || players_score>21){
			winner.innerHTML = "Computer Wins... ";
		}
		else
			winner.innerHTML = "YOU WIN!!";


}

function deal(){

	$('#player-score').empty();
	$('#player-cards').empty();

	$('#status').empty();
	
	$('#computer-score').empty();
	$('#computer-cards').empty();


	players_score = 0;
	computer_score = 0; 
	
	deck = makeDeck(); 
	deck = shuffle(deck);

	num_of_cards = 0;

	numOfPlayersAces = 0;
	numOfComputersAces = 0; 

	$('#hit').attr('disabled', false);
	$('#stay').attr('disabled', false);
	$('#deal').attr('disabled', true);

	drawPlayer();
	drawPlayer();
	drawComputer();

}

var newGame = document.getElementById('deal');
newGame.addEventListener('click', deal, true);

var hitThat = document.getElementById('hit');
hitThat.addEventListener('click', drawPlayer, true);

var stayThere = document.getElementById('stay');
stayThere.addEventListener('click', stay, true);
