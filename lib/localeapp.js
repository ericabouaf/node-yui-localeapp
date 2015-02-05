
var request = require('request');

exports.fetchTranslations = function(project_api_key, cb) {

   // polling is restricted to the last 6 months on localeapp
   var six_month_ago = new Date(new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000),
       updated_at    = "" + Math.floor(six_month_ago.getTime() / 1000);

   request({
      url: "https://api.localeapp.com/v1/projects/" + project_api_key + "/translations.json?updated_at=" + updated_at,
      method: "GET",
      json: true
   }, function(req, res, body) {
      cb(null, body);
   });

};
