var fs = require('fs');
var dummyjson = require('dummy-json');
// Database connection library
var $fh = require('fh-mbaas-api');
var async = require("async");

// Singleton helper;
var service = {};

// User data template used to generate json code
var userTemplate = fs.readFileSync('templates/user.hbs', {
  encoding: 'utf8'
});

var loremTemplate = fs.readFileSync('templates/lorem.hbs', {
  encoding: 'utf8'
});

// Very long lorem ipsum string;
var historyString = dummyjson.parse(loremTemplate);
var chemistryString = dummyjson.parse(loremTemplate);

var options = {
  "act": "create",
  "type": "users",
  "fields": null
};

service.insert = function(statusObj){
  var self = this;
  // Async code execution - will block other requests for a while.
  async.timesSeries(Number(statusObj.total), function(index,next){
    options.fields = JSON.parse(self.getRandomUser());
    options.fields.history = historyString;
    options.fields.chemistry = chemistryString;
    $fh.db(options, function(err){
      if(err){
        statusObj.started = null;
        console.error("Error " + err);
        next(err);
      }else{
        statusObj.iteration = statusObj.iteration + 1;
        console.log("Inserted record");
        next(null);
      }
    });
  }, function(err){
    if(err){
      console.log("Problem occurred" + err);
    }else{
      statusObj.finished = new Date();
      console.log("Finished inserting data into database.");
    }
  })
};

service.getRandomUser = function(){
  return dummyjson.parse(userTemplate);
};

module.exports = service;
