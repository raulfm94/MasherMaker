const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mashermaker',{
	useMongoClient:true
});
var db = mongoose.connection;

// Check connection
db.once('open', function(){
	console.log('Connected to Mongo');
});

// Check for DB errors
db.on('error', function(err){
	console.log(err);
});

// Init app
const app = express();

// Bring in models
var Article = require('./models/article');

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Home Route
app.get('/', function(req, res){
	Article.find({}, function(err, articles){
		console.log("Que verga");
		if(err){
			console.log(err);
		} else {
			res.render('index', {
				title:'Articles',
				articles: articles
			});	
		}
	});
});


// Add Route
app.get('/articles/add', function(req, res){
	res.render('add_article', {
		title:'Add Article'
	});
});

// Add submit POST Route
app.post('/articles/add', function(req, res){
	var article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	article.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/');
		}
	});
});

// Start server
app.listen(3000, function(){
	console.log('Server started on port 3000...')
});