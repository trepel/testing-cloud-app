var express = require('express');
var statusObj = require("./status");
var userService = require("./services/user-service");

module.exports = {
  router: router
};

function router() {
  var router = new express.Router();

  router.get('/', function(req, res) {
    console.log("GET /generate called : " + new Date());

    if(statusObj.isFinished()){
      res.statusCode = 200;
      res.json(statusObj);
      statusObj.clearStatus();
    }else if(statusObj.isInProgress()){
      res.statusCode = 202;
      res.json(statusObj);
    }else{
      insertDataIntoDb(req.query.numberOfRecords);
      res.statusCode = 202;
      res.send(statusObj);
    }
  });

  return router;
}

var insertDataIntoDb = function(numberOfRecords){
  if(!numberOfRecords){
    numberOfRecords = 1;
  }
  statusObj.started = new Date();
  statusObj.total = numberOfRecords;
  setImmediate(function(){
    userService.insert(statusObj)
  });
};
