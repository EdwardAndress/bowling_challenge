describe('Game', function() {
  var game;

  beforeEach(function() {
    game = new Game(Frame, createFramesCallback);
  })

  it('Is composed of 10 frames', function() {
    expect(game.frames.length).toEqual(10)
  });

  it('The frames are ordered by frame number', function() {
    for (i = 0; i < 10; i++) {
      expect(game.frames[i].number).toEqual(i + 1)
    }
  });

  it('Knows which frames have been played', function() {
    game.pinsDown(10)
    unplayedFrames = game.frames.filter(frame => frame.played == false)
    expect(game.unplayedFrames()).toEqual(unplayedFrames)
  });

  it('Can add scores to the next frame, sequentially', function() {
    game.pinsDown(1)
    game.pinsDown(1)
    expect(game.frames[0].scoreOne).toEqual(1)
    expect(game.frames[0].scoreTwo).toEqual(1)
    game.pinsDown(2)
    game.pinsDown(2)
    expect(game.frames[0].scoreOne).toEqual(1)
    expect(game.frames[0].scoreTwo).toEqual(1)
    expect(game.frames[1].scoreOne).toEqual(2)
    expect(game.frames[1].scoreTwo).toEqual(2)
  });

  it('Keeps track of the total score', function() {
    game.pinsDown(2)
    expect(game.totalScore()).toEqual(2)
  });

  it('Knows if some strike frames need updating', function() {
    game.pinsDown(10)
    expect(game.framesPendingBonus()).toEqual([game.frames[0]])
  });

  it('Adds the correct bonus for strikes', function() {
    game.pinsDown(10);
    game.pinsDown(2);
    expect(game.frames[0].total()).toEqual(12);
    expect(game.totalScore()).toEqual(14);
  });

  it('Adds the correct bonus for spares', function() {
    game.pinsDown(5)
    game.pinsDown(5)
    game.pinsDown(1)
    game.pinsDown(1)
    expect(game.frames[0].total()).toEqual(11);
    expect(game.totalScore()).toEqual(13);
  });

  it('Allows two bonus rolls if a strike is achieved in frame 10', function() {
    game.frames.splice(1,9)
    game.pinsDown(10)
    game.pinsDown(1)
    game.pinsDown(1)
    expect(game.totalScore()).toEqual(12)
  });

  it('Allows one bonus roll if a spare is achieved in frame 10', function() {
    game.frames.splice(1,9)
    game.pinsDown(5)
    game.pinsDown(5)
    game.pinsDown(1)
    game.pinsDown(1)
    expect(game.totalScore()).toEqual(11)
  });
})
