function Game(frameClass, createFramesCallback) {
  this.frames = [];

  createFramesCallback(frameClass, this);
}

Game.prototype.unplayedFrames = function() {
  return this.frames.filter(frame => frame.played == false)
}

Game.prototype.framesPendingBonus = function() {
  return this.frames.filter(frame => frame.bonusesPending > 0)
}

Game.prototype.addBonuses = function(score) {
  this.framesPendingBonus().forEach(frame =>
    frame.addBonus(score)
  )
};

Game.prototype.pinsDown = function(score) {
  this.addBonuses(score);

  frame = this.unplayedFrames()[0]
  if(frame != undefined) {
    frame.addScore(score);
  }
};

Game.prototype.finalFrame = function() {
  return this.unplayedFrames().length == 0
};

Game.prototype.totalScore = function () {
  scores = this.frames.map(frame => frame.total())
  sum = (a, b) => a + b
  return scores.reduce(sum)
};

createFramesCallback = function(frameClass, game) {
  [1,2,3,4,5,6,7,8,9,10].forEach(function(i) {
    game.frames.push(new frameClass(i));
  })
}
