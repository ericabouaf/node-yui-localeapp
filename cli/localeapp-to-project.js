
var localeapp = require('../lib/localeapp');

function usage() {
	console.log("Usage: node localeapp-to-project.js PROJECT_API_KEY");
}


if(process.argv.length < 3) {
	console.log("Missing project key !");
	usage();
	process.exit(1);
}



var project_api_key = process.argv[2];


localeapp.fetchTranslations(project_api_key, function(err, response) {

	var translations = response.translations;

	for(var locale in translations) {
		console.log("==== "+locale);

		var l_tr = translations[locale];

		for(var module in l_tr) {
			console.log(module);
			// TODO: write the lang files !!!
		}

	}

});
