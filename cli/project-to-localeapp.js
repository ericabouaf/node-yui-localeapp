
var yaml = require('js-yaml');
var fs   = require('fs');


var YUIproject = require('../lib/yuiproject');

var p = new YUIproject('/Users/neyric/git/inputex'); // TODO


var tr = p.translations();


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

console.log(new_tr);

for(var lang in new_tr) {
	
	var o = {};
	o[lang] = new_tr[lang];

	var yaml_out = yaml.safeDump( o );

	fs.writeFileSync(lang+'.yml', yaml_out);

	//console.log(yaml_out);	
}

