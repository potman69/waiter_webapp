const mongoose = require('mongoose');

module.exports = function(mongoUrl){
  mongoose.connect(mongoUrl);
  const Waiters = mongoose.model('Waiters', {name : String, days: Array});

  return{
    Waiters
  };
}
