// Represents data generation process.
// Contains all process stats

module.exports = {
  started: null,
  finished: null,
  iteration: 0,
  total: null,
  isInProgress: function(){
    return this.started !== null;
  },
  isFinished: function(){
    return this.finished !== null;
  },
  clearStatus: function(){
    this.started = null;
    this.finished = null;
    this.iteration = 0;
  }
};
