document.addEventListener('DOMContentLoaded', function() {
  function populateTable() {
    for (let i = 1; i <= 10; i += 1) {
      var frameNumber = document.createElement('td');
      frameNumber.innerHTML = `Frame ${i} `;
      var rollOne = createFieldWithID(`score${i}-1`);
      var rollTwo = createFieldWithID(`score${i}-2`);
      var total = createFieldWithID(`total${i}`);
      document.getElementById('frame-number').appendChild(frameNumber);
      document.getElementById('roll-one').appendChild(rollOne);
      document.getElementById('roll-two').appendChild(rollTwo);
      document.getElementById('total').appendChild(total);
    }
  };

  function createFieldWithID(id) {
    var field = document.createElement('td');
    field.id = id;
    return field;
  };

  function makeButtonFor(score) {
    var button = document.createElement('button');
    button.id = score;
    button.onclick = function() { updateGame(score); };
    button.innerHTML = score;
    return button;
  }

  function updateGame(score) {
    game.pinsDown(score);
    updateScores();
    resetInputButtons();
    setScoreInputButtons();
  }

  function resetInputButtons() {
    var inputButtons = document.getElementsByTagName('button')
    var limit = inputButtons.length
    for(i = 0; i < limit; i += 1) {
      inputButtons[0].remove();
    }
  }


  function updateScores() {
    document.getElementById('game-total').innerHTML = `Total score: ${game.totalScore()}`;
    var collumnID = 1;
    var frames = game.frames;
    frames.forEach(function(frame) {
      document.getElementById(`score${collumnID}-1`).innerHTML = scoreOneParser(frame);
      document.getElementById(`score${collumnID}-2`).innerHTML = scoreTwoParser(frame);
      document.getElementById(`total${collumnID}`).innerHTML = frame.total();
      collumnID += 1;
    });
  };

  function scoreOneParser(frame) {
    if(frame.scoreOne == null) {
      return '-'
    } else if(strike(frame)) {
      return 'X'
    } else {
      return frame.scoreOne
    }
  }

  function strike(frame) {
    return frame.scoreOne == 10
  }

  function scoreTwoParser(frame) {
    if(frame.scoreTwo == null) {
      return '-'
    } else if(spare(frame)) {
      return '/'
    } else {
      return frame.scoreTwo
    }
  }

  function spare(frame) {
    return (frame.scoreTwo > 0) && (frame.total() >= 10)
  }

  function setScoreInputButtons() {
    var currentFrame = game.unplayedFrames()[0];
    var pinsDown = currentFrame.total();
    var pinsUp = 10 - pinsDown;
    for (i = 0; i <= pinsUp; i += 1) {
      var button = makeButtonFor(i)
      document.getElementById('score-input-buttons').appendChild(button);
    }
  }

  game = new Game(Frame, createFramesCallback)
  populateTable();
  setScoreInputButtons();
  updateScores();
});
