$(document).ready(function(){

  // declare global variables

  var rdmNumber = 0;
  var guessTotal = 0;
  var gemValues = new Array();
  var winCnt = 0;
  var lossCnt = 0;
  var isEnd = false;
  var isWin = false;

  getRdmNumber = function(min, max){ // get a random number between 19 and 120px
    return Math.floor(Math.random() * (max - min) + min);
  }

  fillGemValues = function(x) { // if gem value is not already in array, push it to array
    if (jQuery.inArray( y, gemValues ) === -1){
      gemValues.push(x);
    }
  }

  start = function() { // init variables, get new random goal number, get hidden values for gems
    debugger;
    isEnd = false;
    isWin = false;
    message = "";
    guessTotal = 0;
    gemValues = [];
    // document.getElementById('guessTot').innerHTML = guessTotal;
    $("#guessTot").text(guessTotal);
    $("#rdmNum").text(rdmNumber = getRdmNumber(19, 121));
    $('#crystalsRow').show();
    $('#messageRow').hide();
    while (gemValues.length < 4) {  // generate random gem values between 1 and 12
      fillGemValues(y = Math.ceil(Math.random() * 12));
    }
  }

  $("#crystalsRow").mouseenter(function() {
    var hoverAudio = $("#imgBoxHover")[0];
    hoverAudio.play();
  });

  $("#crystalsRow").mouseleave(function() {
    var hoverAudio = $("#imgBoxHover")[0];
    hoverAudio.pause();
  });

  $(".image").on("click", function() { // click handler for gems
    // accumulate guesses
    guessTotal = (guessTotal + gemValues[$(this).attr('value')]);
    $('#guessTot').text(guessTotal);
    var clinkAudio = document.getElementById("ping");
    clinkAudio.play();
    // test for win or loss
    if (guessTotal === rdmNumber) {
      winCnt++;
      $('#winScore').text(winCnt);
      message = "You won!";
      isEnd = true;
      isWin = true;
    }
    else if (guessTotal > rdmNumber) {
      lossCnt++;
      $('#lossScore').text(lossCnt);
      message = "You lost!";
      isEnd = true;
    }
    // if win or loss, restart
    if (isEnd) {
      $('#crystalsRow').hide();
      $('#messageRow').show();
      if (isWin) {
        var successAudio = document.getElementById("success");
        successAudio.play();
        $('#messageRow').attr('color','green');
        $('#messageRow').html("<span id='messageSpan' class='text-success'>You won!</span>")
        // $('#messageRow').html("<span id='messageSpan' class='text-success fade out'>You won!</span>")
      }
      else {
        var breakAudio = document.getElementById("break");
        breakAudio.play();
        $('#messageRow').attr('color','red');
        $('#messageRow').html("<span id='messageSpan' class='text-danger'>You lost!</span>");
        // $('#messageRow').html("<span id='messageSpan' class='text-danger fade out'>You lost!</span>");
      }
      setTimeout(function(){ start(); }, 3000);
    }

  });

  start();

});
