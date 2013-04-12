
/*
 * GET home page.
 */

 var siteTitle = "ITPWishList";

exports.index = function(req, res){

	var templateData = {
		title : siteTitle,
	}
  res.render('main', templateData);
};
