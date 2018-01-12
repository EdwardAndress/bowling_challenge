function Frame(number) {
  this.bonusesPending = 0;
  this.number = number;
  this.scoreOne = null;
  this.scoreTwo = null;
  this.bonus = null;
  this.played = false;
};

Frame.prototype.addScore = function(score) {
  if(this.scoreOne == null) {
    this.addScoreOne(score);
  } else {
    this.addScoreTwo(score);
  }
};

Frame.prototype.addScoreOne = function(score) {
  this.scoreOne = score;
  if(this.strikeMade()) {
    this.played = true;
    this.bonusesPending = 2;
  }
};

Frame.prototype.addScoreTwo = function(score) {
  this.scoreTwo = score;
  this.played = true;
  if(this.spareMade()) {
    this.bonusesPending = 1;
  }
}

Frame.prototype.strikeMade = function() {
  return this.scoreOne == 10;
};

Frame.prototype.spareMade = function() {
  return ( !this.strikeMade() && this.total() == 10 )
}

Frame.prototype.addBonus = function(score) {
  this.bonus = this.bonus += score
  this.bonusesPending -= 1
}

Frame.prototype.total = function() {
  return this.scoreOne + this.scoreTwo + this.bonus
};
