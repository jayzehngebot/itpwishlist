
/*
 * GET home page.
 */

 var siteTitle = "ITPWishList";
 var moment = require("moment"); // date manipulation library
var dreamCourseModel = require("../models/dreamCourse.js"); //db model

exports.view = function(req, res){

	console.log('main page req');

	dreamCourseModel.find({}, 'name description proj_or_theory ayes', function(err, allClasses){
		if (err){
			res.send('error with db').status(500);
		};
		console.log('nabbed classes');
	
	var templateData = {
		classes : allClasses,
	}

  res.render('view', templateData);
});
}

exports.add = function(req, res){

	console.log('main page req');
	
	var templateData = {
		title : siteTitle,
	}

  res.render('main', templateData);
	};

exports.postClass = function(req, res){

	console.log('recieved new class');
	console.log(req.body);

	var newClass = new dreamCourseModel({
		name : req.body.classTitle,
		slug : req.body.classTitle.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'),
		description : req.body.descript,
		//themes : req.body.themes.split(","),
		//skills : req.body.skills.split(","),
		//genius : 
		date : moment().format(),
		proj_or_theory : req.body.proj_or_theory,
		ayes : 0

	});

newClass.save(function(err){
		if (err) {
			console.error("Error on saving new class");
			console.error(err);
			return res.send("There was an error when creating a new class");

		} else {
			console.log("Created a new dreamClass!");
			console.log(newClass);
			
			// redirect to the astronaut's page
			res.redirect('/');
		}
	});
};
