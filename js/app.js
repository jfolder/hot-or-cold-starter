$(document).ready(function(){

/********************** INITIALIZE TOP SCORE **************************/
$("section").data("finalScore", 0);
/**********************************************************************/



/**************************** START: Functions *********************************/	
function cleanUp() {
	$("ul#guessList").empty();
}
function updateNumberOfGuesses() {
	var count;
	count = +$("span#count").text();
	count++;
	$("span#count").text(count);
}
function generateAnswer() {
	return (1 + Math.floor(Math.random() * 100));
}
function getAnswer() {
	return $("section>h3").data("answerStored");
}
function getGuess() {
	var guess;
	guess = $("input#userGuess").val();
	$("input#userGuess").val("");
	if ((guess == NaN) || (guess%1 != 0) || (guess < 1) || (guess > 100) || ($.trim(guess).length == 0) || !($.isNumeric(guess)) )
	{
		return "undefined";
	}
	else
	{
		$("ul#guessList").prepend("<li>" + guess + "</li>");
		return +guess; //return integer value of guess
	}
}
function newGameConstructor(numberOfGuesses, score, feedback, answer) {
	$("span#count").text(numberOfGuesses);
	$("span#score").text(score);
	$("span#score").data("scoreStored", score);
	$("h2#feedback").text(feedback);
	$("section>h3").data("answerStored", answer);
}
function newGame() {
	var answer = generateAnswer();
	var feedback = "Make Your Guess!";
	var numberOfGuesses = 0;
	var score = 2000; 
	$("section > h3").empty().prepend("Currently have <span id=\"score\">0</span> points!"); //reset text
	$("input#userGuess").attr("disabled", false); //enable the input box
	$("input#guessButton").attr("disabled", false); //enable the input button
	cleanUp(); //remove left-over elements
	newGameConstructor(numberOfGuesses, score, feedback, answer); //Initialize and construct our game
}
/***************************** END: Functions *********************************/





/******************************** PLAY *****************************************/
$("input#guessButton").click(function(e) {
	var hunch;
	var key;
	var points;
	var topScore;

	hunch = getGuess();

	if(hunch == "undefined") { 
		e.preventDefault();
	}
	else
	{
		key = getAnswer();
		
		updateNumberOfGuesses();

		points = +$("span#score").data("scoreStored");

		//Check temperature and configure points
		if (hunch == key) 
		{
			$("h2#feedback").text("Eureka! You found it!");
			topScore = +$("section").data("finalScore");
			$("section").data("finalScore", points);
			$("input#userGuess").attr("disabled", true);
			$("input#guessButton").attr("disabled", true);
			if(points > topScore && topScore > 0) {
				alert("Congratulations, you have beat your top score!!!");
			}
			else if(points == topScore) {
				alert("Congratulations, you have matched your top score!");
			}
			e.preventDefault();
		}
		else if (hunch >= (key - 10) && hunch <= (key + 10)) 
		{
			//100 points removed
			$("h2#feedback").text("You are very hot");
			points = points - 100;

		}
		else if (hunch >= (key - 20) && hunch <= (key + 20)) 
		{
			//200 points removed
			$("h2#feedback").text("You are hot");
			points = points - 200;
		}
		else if (hunch >= (key - 30) && hunch <= (key + 30)) 
		{
			//300 points removed
			$("h2#feedback").text("You are warm");
			points = points - 300;
		}
		else if (hunch >= (key - 50) && hunch <= (key + 50)) 
		{
			//500 points removed
			$("h2#feedback").text("You are cold");
			points = points - 400;
		}
		else {
			//1000 points removed
			$("h2#feedback").text("You are Ice Cold");
			points = points - 500;
		}

		//Display new text depending on score
		if (points <= 700)
		{
			$("section > h3").empty().prepend("A microscopic <span id=\"score\">0</span> points left!");
		}
		else if (points <= 1000)
		{
			$("section > h3").empty().prepend("Just another <span id=\"score\">0</span> points left!");
		}
		else if (points <= 1500) {
			$("section > h3").empty().prepend("Only have <span id=\"score\">0</span> points left!");
		}

		//Display and store points
		if (points < 1)	{
			$("h2#feedback").text("GAME OVER");
			$("section > h3").empty().prepend("You have no points left!");
			$("span#score").text(0);
			$("input#userGuess").attr("disabled", true);
			$("input#guessButton").attr("disabled", true);
			e.preventDefault();
		}
		else {
			$("span#score").text(points);
			$("span#score").data("scoreStored", points);
		}
	}
});
/*******************************************************************************/




/********************** BEGIN NEW GAME ******************************/
newGame();
jQuery(".new").click(function() {
	newGame();
});
/******************************************************************/




/*********************** DISPLAY/HIDE INFORMATION ******************************/

/*--- Display information modal box ---*/
$(".what").click(function(){
	$(".overlay").fadeIn(1000);
});

/*--- Hide information modal box ---*/
$("a.close").click(function(){
	$(".overlay").fadeOut(1000);
});
/*******************************************************************************/

});