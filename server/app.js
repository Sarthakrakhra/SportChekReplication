const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(session({
	secret : "doesThisWork",
	saveUninitialized : false,
	resave : false
}));

const userRequest = require('./api/routes/userRequest.js');
const productRequest = require('./api/routes/productRequest.js');

const config = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb+srv://web-centric-a3-user:web-centric-a3-user@web-centric-sportchek-hdiqg.mongodb.net/test?retryWrites=true&w=majority", config);


app.use('/userRequest', userRequest);
app.use('/productRequest', productRequest);


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error : {
			message : error.message
		}
	});
});

module.exports = app;