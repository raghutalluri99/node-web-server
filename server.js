const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res,next) => {
	res.render('maintenance.hbs');
})

app.use((req, res, next) => {
	var now= new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if(error){
			console.log('Unable to append');
		}
	});
	next();
});

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) =>{
	// res.send({
	// 	name : 'Raghu',
	// 	likes : [
	// 	  'lifting',
	// 	  'bball'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMesg: 'welcome to my website',
	});
});

app.get('/About', (req, res)=> {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/Error', (req, res) => {
	res.send({
		error: 'Error Message'
	})
})

app.listen(3000);