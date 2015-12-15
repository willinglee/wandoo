var user = require('../models/user.js');
var _ = require('underscore');

module.exports = {
  get : function (req, res) {
    user.get(req.params.userID, function (err, result) {
      if ( err ) {
        console.error(err);
        res.status('400').send('There was an error');
      } else {
        res.json(result); 
      }
    });
  },

  post: function (req, res) {
    var userAttr = {
      name : 0,
      facebookID : 1,
      email : 2,
      age : 3,
      sex : 4,
      profilePic : 5,
      employer : 6,
      jobTitle : 7,
      latitude : 8,
      longitude : 9
    };

    var eduAttr = {
      educationInstitution : 0
    };

    var userValues = [],
      eduValues = [];

    for ( var i in req.body ) {
      if ( i in userAttr ) {
        userValues[userAttr[i]] = req.body[i];
      } else if ( i in eduAttr ) {
        eduValues[eduAttr[i]] = req.body[i];
      }
    }

    user.post(userValues, eduValues, function (err, result) {
      if ( err ) {
        console.error(err);
        res.status('400').send('There was an error with insertion');
      } else {
        res.send();
      }
    });
  },

  delete : function (req, res) {
    user.delete(req.params.userID, function (err, result1, result2) {
      if ( err ) {
        console.error(err);
        res.status('400').send('Error with deletion');
      } else {
        console.log(result1);
        console.log(result2);
        res.send();// what if there was no user that had the userID specified?
        // we can use result.affectedRows=0 to check if there was a deletion
      }
    });
  },

  put : function (req, res) {

    var locAttr = {
      latitude : 0,
      longitude : 1
    };

    var locValues = [];

    for ( var i in req.body ){
      if ( i in locAttr ) {
        locValues[locAttr[i]] = req.body[i];
      } else {
        res.send('Wrong parameters');
        return;// is this necessary?  will execution continue further even though we've sent?
      }
    }
    console.log(locValues);

    locValues.push(req.params.userID);

    user.put(locValues, function (err, result) {
      if ( err ) {
        console.error(err);
        res.status('400').send('Error with update');
      } else {
        console.log(result);
        res.send();
      }
    });

  }


}