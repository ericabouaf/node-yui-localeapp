#!/usr/bin/env node

var yaml = require('js-yaml'),
    fs   = require('fs'),
    YUIproject = require('yui-project').YUIproject;



var p = new YUIproject( process.cwd() );
var tr = p.translations();


// Reindex the translations [module, locale] => [locale, module]
// to match the LocaleApp YAML format
var new_tr = {};
for(var module in tr) {
	var module_tr = tr[module];
	for(var lang in module_tr) {
		if(!new_tr[lang]) {
			new_tr[lang] = {};
		}
		new_tr[lang][module] = module_tr[lang];
	}
}


for(var lang in new_tr) {
	var o = {};
	o[lang] = new_tr[lang];
	var yaml_out = yaml.safeDump( o );
	var dest_file = lang+'.yml';
	console.log("Writing "+dest_file+"...");
	fs.writeFileSync(dest_file, yaml_out);
}

console.log("Done !\nYou can now upload those YAML files to LocaleApp.\n");

