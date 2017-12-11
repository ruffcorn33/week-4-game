$(document).ready(function(){

  // Declare variables

  var rdmNumber;
  var guessTotal = 0;
  var gemValues = new Array();
  var message;
  var winCnt = 0;
  var lossCnt = 0;
  var isEnd = false;

  getRdmNumber = function(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }

  fillGemValues = function(x) {
    if (jQuery.inArray( y, gemValues ) === -1){
      debugger;
      gemValues.push(x);
    }
  }

  start = function() {
    isEnd = false;
    message = "";
    guessTotal = 0;
    document.getElementById('guessTot').innerHTML = guessTotal;
    document.getElementById('winLossMsg').innerHTML = message;
    document.getElementById('rdmNum').innerHTML = rdmNumber = getRdmNumber(19, 121);
    var i = 0;
    while (gemValues.length < 4) {
      y = Math.ceil(Math.random() * 12);
      fillGemValues(y);
    }
    console.log(gemValues);
  }

  $(".image").on("click", function() {
    document.getElementById('guessTot').innerHTML = guessTotal = (guessTotal + gemValues[$(this).attr('value')]);
    if (guessTotal === rdmNumber) {
      winCnt++;
      document.getElementById('winScore').innerHTML = winCnt;
      message = "You won!";
      document.getElementById('winLossMsg').innerHTML = message;
      isEnd = true;
    }
    else if (guessTotal > rdmNumber) {
      lossCnt++;
      document.getElementById('lossScore').innerHTML = lossCnt;
      message = "You lost!";
      document.getElementById('winLossMsg').innerHTML = message;
      isEnd = true;
    }

    if (isEnd) {
      start();
    }

  });

  start();

});
