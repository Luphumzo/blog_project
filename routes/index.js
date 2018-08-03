var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");


// can import code directly from file

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Business World' , posts:posts.posts});
});

router.post('/', function(req,res,next){

  var user = posts.users;
  console.log(user)
  var username = req.body.username;
  var password = req.body.password;

  for(let i in user){
    console.log(username);
    if(username == user.username && password == user.password){

      // res.render('index',{title: 'sign up', posts:posts.posts, message:false});
     console.log("you're in ");
    }else{
    //  res.redirect('/signIn');
      console.log("sorry");
      console.log(user);
    }
  }


});

/* GET New blog page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'New Article', posts: posts.posts});
});

/* GET edit from archives page */
router.get('/archives/new', function (req, res, next) {
  var id = req.params.id;
  var data = posts.posts[id-1];
  res.render('new', { title: 'The Blogs', posts: data });
});

/* POST  On New blog page. */

router.post('/new', function (req, res, next) {
  // res.send(req.body)

// create variable to post 

  var obj = {
    "title": req.body.title,
    "author": req.body.author,
    "image": req.body.image,
    "date": req.body.date,
    "time": req.body.time,
    "content": req.body.content,
  }

  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  },function(error,responsive,body){
  //  res.redirect('/')
  });

});


/* ContactUs page. */
router.get('/contactUs', function (req, res, next) {

  res.render('contactUs', { title});

});

/* GET Archives page */
router.get('/archives', function (req, res, next) {
  res.render('archives', { title: 'New Article', posts: posts.posts });
});


/* GET Archives from full-blog page */
router.get('/full-blog/archives', function (req, res, next) {
  res.render('archives', { title: 'New Article', posts: posts.posts });
});
/* Full-blog page. */
router.get('/full-blog/:id', function (req, res, next) {

  var id = req.params.id;
  var data = posts.posts[id-1];

  res.render('full-blog', { title: 'The Blogs', posts: data });

});

/* GET edit page */
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  var data = posts.posts[id-1];
  res.render('edit', { title: 'The Blogs', posts: data });
});

///// update/////

router.post('/edit/:id', function (req, res, next) {

  request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "PATCH",
    form: {
      "title": req.body.title,
      "author": req.body.author,
      "image": req.body.image,
      "content": req.body.content,
      "date": req.body.date,
      "time": req.body.time,
    }
  }, function (error, response, body) {
    res.redirect('/full-blog/' + req.params.id);
  });

});
/* GET SignIn page */
router.get('/signIn', function (req, res, next) {
  res.render('signIn', { title: 'SignIn', users: posts.users});
});

/* POST  On SignIn Page. */

router.post('/signIn', function (req, res, next) {
  // res.send(req.body)

  // create variable to post 

  var obj = {
    "username": req.body.username,
    "Email": req.body.Email,
    "password": req.body.password,
  }

  //write logic that saves this data
  request.post({
    url: 'http://localhost:8000/users',
    body: obj,   
    json: true
  }, function (error, responsive, body) {
     res.redirect('/')
  });

});



/////////////////////DELETE//////
router.get('/delete/:id', function (req, res, next) {
  request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "Delete",
  },function(error , response , body){
    res.redirect("/archives");
  });
});

module.exports = router;