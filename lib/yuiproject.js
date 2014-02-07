
var fs = require('fs'),
    path = require('path');




var YUImodule = function(module_folder, yui_project) {
	this.yui_project = yui_project;
	this.module_folder = module_folder;

	this.name = module_folder;
};

YUImodule.prototype = {

	path: function() {
		return path.join(this.yui_project.root_path, 'src', this.module_folder);
	},

	lang_path: function() {
		var l_path = path.join(this.path() , 'lang');
		return fs.existsSync(l_path) ? l_path : null;
	},

	lang_files: function() {
		if(!this.lang_path()) {
			return null;
		}

		return fs.readdirSync(this.lang_path());
	},

	translations: function() {
		var l_path = this.lang_path();
		var files = this.lang_files();

		if(files === null) return null;

		var locale_tr = files.slice(1); // remove the default lang with no locale

		var tr = {};

		locale_tr.forEach(function(f) {
			var s = f.split('_');
			var locale = s[s.length-1].substr(0, s[s.length-1].length-3) ;
			var content = fs.readFileSync( path.join(l_path, f) ).toString();

			try {
				var d = eval("("+content+")");
			}
			catch(ex) {
				console.log("error in "+f);
				console.log(ex);
				return;
			}

			tr[locale] = d;
		});

		return tr;
	}

};



var YUIproject = function(root_path) {
	this.root_path = root_path;
};

YUIproject.prototype = {

	modules: function() {
		var src_path = path.join(this.root_path, 'src');
		var modules_folders = fs.readdirSync(src_path);

		var yui_project = this;
		var modules = modules_folders.map(function(module_folder) {
			return new YUImodule(module_folder, yui_project);
		});
		return modules;
	},

	translations: function() {

		var modules = this.modules();

		var translations = {};

		modules.forEach(function(module) {
			var tr = module.translations();
			if(tr !== null)
				translations[module.name] = tr;
		});

		return translations;
	}

};

module.exports = YUIproject;