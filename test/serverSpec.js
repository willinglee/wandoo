var request = require('supertest');
var expect = require('chai').expect;
var db = require('../server/db');


var server = request.agent('http://localhost:8000');

var userTableValues = [
  'Pete Zurish', //name
  134515, //facebookID 
  'pete.z@gmail.com', //email
  28, //age
  'M', //sex
  'need a profile pic', //profile_picture
  'Google', //employer
  'Software Engineer', //job_title
  '37.7836675', //latitude
  '-122.4091699' //longitude
  ];

var userReturnedValues = {
  name : 'Pete Zurish',
  facebookID  : 134515,
  email : 'pete.z@gmail.com',
  age : 28,
  sex : 'M',
  profile_picture : 'need a profile pic',
  employer : 'Google',
  job_title : 'Software Engineer',
  latitude : 37.7836675,
  longitude : -122.4091699,
  institution_name : 'University of Toronto'
}

var userEduTableValues = [
  undefined, // userID
  'University of Toronto' // institution_name
]

var insertedUserID;

var insertUser = function (err, callback) {
  if ( err ) {
    callback(err);
  } else {
    var qs1 = "INSERT INTO `user` (`userID`,`name`,`facebookID`,`email`,\
      `age`,`sex`,`profile_picture`,`employer`,`job_title`,`latitude`,`longitude`) \
      VALUES (0,?,?,?,?,?,?,?,?,?,?);";

    var qs2 = "INSERT INTO `user_educational_institution` \
      (`userID`,`institution_name`) VALUES (?,?);";

    db.query(qs1, userTableValues, function(err, results1) {
      if ( err ) {
        callback(err);
      } else {
        userEduTableValues[0] = results1.insertId;
        insertedUserID = results1.insertId;
        userReturnedValues.userID = insertedUserID;
        db.query(qs2, userEduTableValues, function(err,results2) {
          if ( err ) {
            callback(err);
          } else {
            callback(null, results1, results2);
          }
        });
      }  
    });
  }

};

var deleteUsers = function (callback, done) {
  var qs1 = "delete from user_educational_institution";
  var qs2 = "delete from user";

  db.query(qs1, function (err, results1) {
    if ( err ) {
      callback(err);
    } else {
      db.query(qs2, function (err, results2) {
        if ( err ) {
          callback(err);
        } else {
          callback(null, done);
        }
      });
    }
  });
};



// sanity test

xdescribe('GET /api/test', function(){
  it('Sanity test', function(done){
    server
      .get('/api/test')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// USERS

describe('POST /api/users', function() {
  it('should add a user to the database', function(done) {

    var user = {
        name: 'Pete Zurish',
        facebookID : 134515,
        email: 'pete.z@gmail.com',
        age: 28,
        sex: 'M',
        profilePic: 'need a profile pic',
        employer: 'Google',
        jobTitle: 'Software Engineer',
        latitude: '37.7836675',
        longitude: '-122.4091699',
        educationInstitution: 'University of Toronto'
      };
    server
      .post('/api/users')
      .send(user)
      .expect(200)
      .end(done);
  });
  // can we create a test to verify that this user is in the database?
});

describe('GET /api/users:userID', function() {

  var userID = 6;

  before(function(done) {
    // deletes all users from the database, inserts a user, and then calls done
    deleteUsers(insertUser, done);
  });

  it('should return all required data for a user', function (done) {
    // send the get request for the userID
    server
      .get('/api/users/' + insertedUserID)
      // .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body.results[0]).to.deep.equal(userReturnedValues);
      }) 
      .end(function (err, res) {
        if ( err ) {
          throw err;
        }
      });


    // verify that the inserted user and all of the user's data is returned

  });

});


xdescribe('DELETE /api/users', function() {
  it('should delete a specified user from the database', function() {
    // insert user into database

    // send delete request for the userID

    // verify that the user no longer exists in the database

  });

});

xdescribe('PUT /api/users', function() {
  it('should update a user\'s location in the database', function(done) {
    // insert user into database

    // send put request for the userID 

    // verify that the location modifications are reflected in the database

  });

});

// wandoos

xdescribe('GET /api/wandoos', function() {
  it('should return all wandoos', function() {

  });

  it('should use limit to limit the number of returned wandoos', function () {

  });

  it('should use offset to specify the record number to start returns for', function () {

  });
});

xdescribe('POST /api/wandoos', function() {
  it('should add a wandoo to the database', function() {

  });
});

xdescribe('DELETE /api/wandoos', function() {
  it('should delete a specified wandoo from the database', function() {

  });
});

// rooms

xdescribe('GET /api/rooms', function() {
  it('should return all rooms', function() {

  });
});

xdescribe('POST /api/rooms', function() {
  it('should add a room to the database', function() {

  });
});

xdescribe('DELETE /api/rooms', function() {
  it('should delete a room from the database', function() {

  });
});
