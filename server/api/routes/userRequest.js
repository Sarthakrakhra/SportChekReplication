const express = require('express')
const router = express.Router();
const Users = require("../models/user");
const mongoose = require('mongoose');

const session = require('express-session');

router.use(session({
	secret : "doesThisWork",
	saveUninitialized : false,
	resave : false
}));



router.get('/checkUser/:username', (req, res, next)=>{

	const username = req.params.username;


	Users.find({"username" : username})
	.then(result => {

		if(result.length == 1){
			if(result[0].get('username') == username)
				res.status(200).json({"userAvailable":false});
			else
				res.status(200).json({"userAvailable":true});
		}
		else{
			res.status(200).json({"userAvailable": true});
		}

		res.end();
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({'error' : err});
		res.end();
	});
	
});


router.post('/newUser', (req, res, next)=>{
	
	const user = new Users({
		_id : new mongoose.Types.ObjectId(),
		username : req.body.username,
		password : req.body.password
	});

	user.save().then(result => {
		if(result){
			console.log(result);
			res.status(200).json({'message' : 'recieved get request for user', 'created user' : user});
			res.end();
		}else{
			res.status(404).json({'message' : "no valid entry"});
			res.end();
		}
	}).catch( err =>{
		console.log(err);
		res.status(500).json({'error' : err});
		res.end();
	} );

});



router.post('/login', (req, res, next)=>{
	
	const username = req.body.username;
	const password = req.body.password;

	Users.find({"username" : username})
	.then(result => {

		if(result.length == 1){

			if(result[0].get('username') === username && result[0].get('password') === password){
				req.session.user = result[0].get('username');
				req.session.save();
				res.status(200).json({"userExists":true});
			}
			else
				res.status(200).json({"userExists":false});
		}
		else
			res.status(200).json({"userExists": false});

		res.end();
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({'error' : err});
		res.end();
	});


});

router.post('/logout', (req, res, next) =>{
	req.session.destroy((err)=>{
		if(err){
			res.status(500).send('Could not log out')
		}else{
			res.status(200).json({"message" : "logged out"});
		}
	})
})

router.get('/data', (req, res, next)=>{
	res.status(200).json({'user' : req.session.user});
});
module.exports = router;