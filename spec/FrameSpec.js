describe("Frame", function() {
  var frame;

  beforeEach(function() {
    frame = new Frame(1);
  });

  it("knows it's number", function() {
    expect(frame.number).toEqual(1)
  });

  it("should contain the result of roll one", function() {
    frame.addScore(1);
    expect(frame.scoreOne).toEqual(1);
  });

  it("should contain the result of roll two", function() {
    frame.addScore(1);
    frame.addScore(2);
    expect(frame.scoreTwo).toEqual(2);
  });

  it("should contain the result of roll two added to the result of roll one", function() {
    frame.scoreOne = 1;
    frame.scoreTwo = 1;
    expect(frame.total()).toEqual(2);
  });

  it("should record when a strike is made", function() {
    frame.scoreOne = 10;
    expect(frame.strikeMade()).toEqual(true);
  });

  it("should record when a spare is made", function() {
    frame.scoreOne = 5;
    frame.scoreTwo = 5;
    expect(frame.spareMade()).toEqual(true);
  })
});
