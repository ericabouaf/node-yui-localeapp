
var request = require('request');

exports.fetchTranslations = function(project_api_key, cb) {

	request({
		url: "https://api.localeapp.com/v1/projects/"+project_api_key+"/translations.json",
		method: "GET",
		json: true
	}, function(req, res, body) {
		cb(null, body);
	});

};

