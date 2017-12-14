$(document).ready(function(){

  // declare global variables

  var rdmNumber = 0;
  var guessTotal = 0;
  var gemValues = new Array();
  var winCnt = 0;
  var lossCnt = 0;
  var isEnd = false;
  var isWin = false;
  var hoverAudio = $("#imgBoxHover")[0];
  var clinkAudio = $('#ping')[0];
  var successAudio = $('#success')[0];
  var breakAudio = $('#break')[0];

  // get a random number between 19 and 120px
  getRdmNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }

  // if gem value is not already in array, push it to array
  fillGemValues = function(x) {
    if (jQuery.inArray( y, gemValues ) === -1){
      gemValues.push(x);
    }
  }

  // init variables, get new random goal number, get hidden values for gems
  start = function() {
    debugger;
    isEnd = false;
    isWin = false;
    message = "";
    guessTotal = 0;
    gemValues = [];
    $("#guessTot").text(0);
    $("#guessTot1").text(0);
    $("#rdmNum, #rdmNum1").text(rdmNumber = getRdmNumber(19, 121));
    $('#messageRow').hide();
    console.log(window.orientation);
    if (window.orientation===0) {
      $('#crystalsRow1').show();
      $('#crystalsRow').hide();
    }
    else {
      $('#crystalsRow1').hide();
      $('#crystalsRow').show();
    }
    $('#guessTot').text(guessTotal);
    while (gemValues.length < 4) {  // generate random gem values between 1 and 12
      fillGemValues(y = Math.ceil(Math.random() * 12));
    }
  }

  // a couple of event handlers to add sound to the gems container on hover
  $("#crystals").mouseenter(function() {
    hoverAudio.play();
  });

  $("#crystals").mouseleave(function() {
    hoverAudio.pause();
  });

  // click handler for gems
  $(".image").on("click", function() {
    // accumulate guesses
    if (!isEnd) {
      guessTotal = (guessTotal + gemValues[$(this).attr('value')]);
      $('#guessTot, #guessTot1').text(guessTotal);      
    }
    clinkAudio.play();
    // test for win or loss
    if (guessTotal === rdmNumber) {
      winCnt++;
      $('#winScore, #winScore1').text(winCnt);
      message = "You won!";
      isEnd = true;
      isWin = true;
    }
    else if (guessTotal > rdmNumber) {
      lossCnt++;
      $('#lossScore, #lossScore1').text(lossCnt);
      message = "You lost!";
      isEnd = true;
    }
    // if win or loss, restart
    if (isEnd) {
      $('#crystalsRow').hide();
      $('#messageRow').show();
      if (isWin) {
        successAudio.play();
        $('#messageRow').attr('color','green');
        $('#messageRow').html("<span id='messageSpan' class='text-success'>You won!</span>")
      }
      else {
        breakAudio.play();
        $('#messageRow').attr('color','red');
        $('#messageRow').html("<span id='messageSpan' class='text-danger'>You lost!</span>");
      }
      setTimeout(function(){ start(); }, 3000);
    }

  });

  start();

});
