'use strict';

var Urls = require('../models/users.js');
var Url = require('../models/users');
 
 
var appUrl = "https://url-shortener-api-christoph-phillips.c9users.io/"


function ClickHandler () {

	this.getUrl = function (req, res) {
		
		//GET URL FROM PARAM
		var userUrl = req.params.url;

		//GET LATEST NUMBER AND ADD ONE TO IT FOR HTTP EXTENSION
		Urls.find({})
			.exec(function (err, result) {
				if (err) throw err;

				var latestNumber = result.length; //

		
		//LOOK FOR SHORTENED URL IN DB
		Urls
			.findOne({ 'url.shortened':  appUrl + req.params.url }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				
			
				//IF RESULT - REDIRECT TO FULL URL
				if (result) {
					res.redirect(result.url.original)
				}
				
				//IF NOT - USER IS TRYING TO ADD FULL URL
				else {
					
				//CHECK IF URL IS A VALID ADDRESS WITH REGEX
				var re = /^https*:\/\/w{3}\.\w+\.\w+/;
				var bool = re.test(userUrl);
        
        		if (!bool) {
	        		res.json('Not a valid URL - please try again.');
	    			return;
    			} 
					
					Urls
				.findOne({ 'url.original': req.params.url }, { '_id': false })
				.exec(function (err, result) {
				if (err) { throw err; }
				
				
				//IF RESULT - RESPOND WITH ERROR MESSAGE
				if (result) {
					res.json("This address has already been added")
				}
				
				else {
					//CREATE NEW URL OBJECT AND ADD TO DB
					var newUrl = new Url();
				
					newUrl.url.original = userUrl;
					newUrl.url.shortened = appUrl + latestNumber;

					newUrl.save(function (err) {
						if (err) {
							throw err;
							}
								res.json(newUrl);
							}
						);//END OF INPUT NEW URL
					
					}//END OF ELSE
				
				
				});//END OF SECOND FIND	
					
					
				
				}//END OF ELSE
			});//END OF FIRST FIND
		
			});//END OF FIND

} //END OF ADD

}

module.exports = ClickHandler;
