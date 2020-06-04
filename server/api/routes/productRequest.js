const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Product = require("../models/product");

router.get('/', (req, res, next)=>{


	Product.find().exec()
	.then(docs => {
		console.log(docs);
		if(docs.length >= 0){
			res.status(200).json({"message" : "got products", "result" : docs})
			res.end();

		}else{
			res.status(404).json({"message" : "no entries"})
			res.end();

		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error : err});
		res.end();

	})

});

router.get('/:prodID', (req, res, next)=>{
	const prodID= req.params.prodID;

	res.status(200).json({"prodID":prodID});

	// Product.findById(id)
	// 	.exec()
	// 	.then( doc => {
	// 		console.log(doc);
	// 		res.status(200).json({'message' : 'recieved get request for product', 'doc' : doc});
	// 	})
	// 	.catch( err =>{
	// 		console.log(err);
	// 		res.status(500).json({'error' : err});
	// 	}); 

	res.end();
});


router.post('/', (req, res, next)=>{
	

	const products = new Product(req.body);

	products.collection.insert(req.body, (err, docs) => {
		if(err){
			console.log(err)
			res.status(500).json({error : err});
			res.end();
		}else{
			res.status(200).json({"message" : "inserted product" , "result" : docs});
			res.end();
		}
	})
})

module.exports = router;