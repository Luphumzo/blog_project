var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");

// can import code directly from file

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Business World' , posts:posts.posts});
});


/* GET New blog page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'New Article', posts: posts.posts});
});


/* GET New blog page. */

router.post('/new', function (req, res, next) {
  // res.send(req.body)

// create variable to post 

  var obj = {
    "title": req.body.title,
    "author": req.body.author,
    "image": req.body.image,
    "date": req.body.date,
    "time": req.body.time,
    "content": req.body.content
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


/* GET Archives page */
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

/* GET edit from archives page */
router.get('/full-blog/archives/edit:id', function (req, res, next) {
  var id = req.params.id;
  var data = posts.posts[id - 1];
  res.render('edit', { title: 'The Blogs', posts: data });
});

///// update//

router.post('/edit/:id', function(req, res, next) {
  // res.send(req.body)

  request({
    url: "http://localhost:8000/posts/" + req.params.id ,
    method: "PATCH",
     form: {
      "title": req.body.title,
      "author": req.body.author,
      "image": req.body.image,
      "date": req.body.date,
      "time": req.body.time,
      "content": req.body.content,
    }
  }, function (error, response, body) {
    res.redirect('/full-blog/' + req.params.id );
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