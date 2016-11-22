var express = require('express');
var answerService = require('../commonservices/answerservice.js');
var userService = require('../commonservices/userservice.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  answerService.getAnswers(req.query.problemRefId, function(answers){
    userService.getAllUsers(function(allUsers){
      for(var idx = 0; idx < answers.length; idx += 1) {
        answers[idx].postedBy = allUsers[idx + 1];
      }
      res.send(answers);
    });
  });
});

router.get('/:answerId', function(req, res, next) {
  answerService.getAnswerById(req.params.answerId, function(answer){
    userService.getUserById(answer.postedBy, function(user){
      answer.postedBy = user;
      res.send(answer);
    });
  });
});

router.post('/', function(req, res, next) {
  var answer = answerService.postAnswers(req.body);
  res.send("OK");
});

module.exports = router;
