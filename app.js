'use strict';

var state = {};

//listener function start button hides starts button then displays first question
function startListener () {
	console.log('startlistener function started');
	$('.start').click( function () {
			$( 'h1').next().addClass('hidden');
			displayQuestion();
		});
}

//listener function for submit button and answer put is right answer and displays
function submitListener () {
	console.log('submit listener started');
	console.log($('input.button'));
	$('.question').submit(function (event) {
		event.preventDefault();
		$('input.button').addClass('hidden');
		gradeQuestion();
	});
}


//listener function for continue button
function continueListener () {
	console.log('continue listener started');
	$('.continue').click(function(event) {
		$('.answer').addClass('hidden').children().remove();
		$('.questions').addClass('hidden').children().remove();
		if (state.place == state.total){
			// they would be done with the last question
			lastPageDisplay();
		} else {
			state.place++;
			displayQuestion();
		}
	});
}


//listener function for restart quiz from end page
function restartQuizListener () {
	$('.restart').click( function(){
		$('.end').addClass('hidden');
		beginQuiz();
	});
}

//function to begin quiz
function beginQuiz () {
	state.correct = 0;
	state.incorrect = 0;
	state.place = 1;
	state.total = 10;
	$( 'h1').next().removeClass('hidden');
}


//function to build object
function questions (question, choiceArray, answerKey){
	return {
		question: question,
		choiceArray: choiceArray,
		answerKey: answerKey
	};
}

//function to display questions
function displayQuestion () {
	console.log('displayQuestion function started');
	$('.questions').removeClass('hidden');
	var renderHTML = '<h2>Question Number ' + state.place + ' of ' + state.total + '</h2>' +
		'<h3>' + state.correct + ' correct, ' + state.incorrect + ' incorrect</h3>' +
    '<form action = \'\' class="question">' + questionArray[state.place-1].question + 
    '<br> <br> <label><input class="choice" type= "radio" name="answer" value = 0>&ensp;' + questionArray[state.place-1].choiceArray[0] + '</label>' +
    '<br> <input class="choice" type="radio" name="answer" value = 1>&ensp;' + questionArray[state.place-1].choiceArray[1] +
    '<br> <input class="choice" type="radio" name="answer" value = 2>&ensp;' + questionArray[state.place-1].choiceArray[2] +
    '<br> <input class="choice" type= "radio" name="answer" value = 3>&ensp;' + questionArray[state.place-1].choiceArray[3] +
    '<br> <br> <input class="button" type="submit" value="Submit"> </form>';
    $('.questions').append(renderHTML);
	submitListener();
}

//function to display if correct or incorrect
function gradeQuestion () {
	var gradeHTML
	console.log('gradeQuestion started');
	//how do I get the form choice/value?
	var choice = $("input[type=radio][name=answer]:checked").val();
	var answer = questionArray[state.place-1].answerKey;
	console.log(choice + 'choice');
	console.log(answer + 'answer');
	if (choice == answer) {
		state.correct ++;
		gradeHTML = '<H4>Correct, nice job!</H4>';
	}else{
		state.incorrect ++;
		gradeHTML = '<H4>Incorrect, the correct answer is:<br>' +
		questionArray[state.place-1].choiceArray[answer] + '</H4>';

	}
	$('.answer').removeClass('hidden');
	$('.answer').append(gradeHTML + '<br><button class="button-label continue">' +
      '<span class="button-label">Continue</span> </button>');
	continueListener();

}
//function to display last page
function lastPageDisplay () {
	$('.end').removeClass('hidden');
	var endHTML = '<h2>Quiz Complete</h2> <p>Your final score was '+
	state.correct + ' out of ' + state.total + ' questions correct</p>' +
	'<button class="button-label restart">' +
		'<span class="button-label">Restart quiz</span></button>';
	$('.end').append(endHTML);
	restartQuizListener();

 }
// \\tried to "escape quotes in questions 6 and others, displays weirdly Questio 8 + 10"

var question1 = questions('What product/service does our Company offer to customers?',
 	['Gives them reliable transportation that we stand behind',
	'Access to financing which may be difficult for them to obtain',
	'The opportunity to establish good credit with on-time payments',
	'All of the above'], 3);
var question2 = questions('Why are customers in the situation to need our product/service?',
 	['They are deadbeats and untrustworthy',
	'They do not know how to be responsible',
	'They do not like buying new cars', 'They have had life issues that have impacted them in a negative way'],
 	3);
var question3 = questions('What is the primary mission of our Company?', 
	['To sell cars', 'To make money', 'Provide a product/service to help customers have a better life',
	 'To collect money'], 2);
var question4 = questions('Where and how are the vehicle we sell obtained?', 
	['From the salvage yard', 'They are the cheapest vehicles we can get at auction',
	'From people that are looking to sell their vehicles','Hand selected from auctions or wholesalers'], 3);
var question5 = questions('What is the primary consideration of our vehicle inspection process?', 
	['Make the vehicles like new','Fix only cosmetic items','To repair the car as quickly as possible',
	'The safe operation of the vehicle'], 3);
var question6 = questions('When a vehicle is sold, what is the primary consideration(s)?', 
	['That we maximize our profit','Ensuring the customer loves the color of the vehicle',
	'Getting the customer to say \“Yes\”','Ensuring the vehicle meets the customer\’s transportation \
	needs and that they can afford it'], 3);
var question7 = questions('What one key goal with review the final sale paperwork with customers?', 
	['Ensuring they understand all parts of the transaction','Getting through it as quickly as possible',
	'Just making sure they sign where is needed','Presenting the deal in the best way possible'], 0);
var question8 = questions('In the Finance Company\’s collection process, what is the principle manner of collecting?', 
	['Threatening the customers that they must pay','Shaming them to make them feel bad about themselves',
	'Remind them of their commitment and the benefits of paying','Repossessing their vehicle'], 2);
var question9 = questions('When a customer has a major mechanical breakdown and emotionally calls \
	Service, what is the best response service should give?', ['Tell the customer it is not our fault',
	'Apologize that they are inconvenienced and schedule them into Service ASAP','Get emotional back to them',
	'Recommend an outside service shop to repair the vehicle'], 1);
var question10 = questions('If someone we know or meet outside of work asks what we Company \“does,\” what \
	is the best and most descriptive answer?',['We sell cars','We finance vehicles','We service vehicles',
	'We provide a Program to help customers get a vehicle with a warranty, and financing \
	which gives them the opportunity to establish a good credit history'], 3);

//Build question array
var questionArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
// any way to build map function to do this?
// var questionArray = $.map(questions , function ())]

// var questionArray = [];
// for (var x = 1 ; x <= 10; i++ ) {
// 	questionArray.push(this[question + i]);
// }

// Start Quiz
beginQuiz();


$(function () {
	startListener();
});