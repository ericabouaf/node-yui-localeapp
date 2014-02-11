#!/usr/bin/env node

var localeapp = require('../lib/localeapp'),
	YUIproject = require('yui-project').YUIproject;


function usage() {
	console.log("Usage: localeapp-to-project PROJECT_API_KEY");
}
if(process.argv.length < 3) {
	console.log("Missing project key !");
	usage();
	process.exit(1);
}



var project = new YUIproject( process.cwd() );
var project_api_key = process.argv[2];


localeapp.fetchTranslations(project_api_key, function(err, response) {

	var translations = response.translations;

	for(var locale in translations) {
		var l_tr = translations[locale];
		for(var module_folder_name in l_tr) {
			console.log(module_folder_name);
			var yuimodule = project.module(module_folder_name);
			yuimodule.add_translation(locale, l_tr[module_folder_name]);
		}

	}

});

