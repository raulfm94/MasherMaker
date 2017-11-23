const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/subtitles',{
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
var Subtitle = require('./models/subtitle');

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
// app.get('/', function(req, res){
// 	Article.find({}, function(err, articles){
// 		console.log("Que verga");
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render('index', {
// 				title:'Articles',
// 				articles: articles
// 			});	
// 		}
// 	});
// });

var test = "fuck";

app.get('/', function(req, res){
	Subtitle.find({'text': / what /i}, function(err, subtitles){
		console.log("Obteniendo subs");
		if(err){
			console.log(err);
		} else {
			res.render('index', {
				title:'MasherMaker',
				subtitles: subtitles
			});
		}
	});
});

app.post('/', function(req, res){
	//var subtitle = new Subtitle();
	Subtitle.episode = req.body.episode;
	Subtitle.text = req.body.text;

	
	const text1 = req.body.text;
	const episode1 = "{'text'" + ":" + " /" + text1 + "/i}";

	//const query = Subtitle.find({episode1});

	//query.select('episode start text end');
	//query.limit(5);

	// query.exec(function(err, subtitles){
	// 	console.log("Antes de buscar " + episode1);
	// 	if(err){
	// 		console.log("Error???");
	// 		console.log(err);
	// 	} else {
	// 		console.log("Success???");
	// 		res.render('index', {
	// 			title:'Subtitles',
	// 			subtitles: subtitles
	// 		});
	// 		console.log(subtitles);
	// 	}
	// });

	// query[episode1] = text1;

	console.log("Antes de buscar " + episode1);

	Subtitle.find({'text': /What/i}, function(err, subtitles){
		console.log("Buscando " + episode1);
		if(err){
			console.log("Error???");
			console.log(err);
		} else {
			console.log("Success???");
			res.render('index', {
				title:'Subtitles',
				subtitles: subtitles
			});
			console.log('MapReduce took %d ms', stats.processtime);
		}
	});
});

app.post('/', function(req, res){
	//var subtitle = new Subtitle();

	Subtitle.episode = req.body.episode;
	Subtitle.text = req.body.text;

	var o = {};

	o.map = function() {
		emit(this.episode, this.text);
	};

	o.reduce = function(id, texts) {
		return Array.sum(texts);
	};

	o.verbose = true;

	Subtitle.mapReduce(o, function(err, results, stats) {
		console.log('MapReduce took 87 ms');
		console.log(results);
	});
	
	console.log("Success???");
	res.render('index', {
		title:'Subtitles',
		subtitles: subtitles
	});
});

// Add Route
// app.get('/articles/add', function(req, res){
// 	res.render('add_article', {
// 		title:'Add Article'
// 	});
// });

// Add submit POST Route
// app.post('/articles/add', function(req, res){
// 	var article = new Article();
// 	article.title = req.body.title;
// 	article.author = req.body.author;
// 	article.body = req.body.body;

// 	article.save(function(err){
// 		if(err){
// 			console.log(err);
// 			return;
// 		} else {
// 			res.redirect('/');
// 		}
// 	});
// });

// Start server
app.listen(3000, function(){
	console.log('Server started on port 3000...')
});