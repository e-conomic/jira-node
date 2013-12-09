var request = require("request");
var url = require("url");
var querystring = require("querystring");

var jira = {};

module.exports = jira;
jira.setServer =  function(server){
	jira.urlServer = server;
}

jira.setCredentials = function(username, password){
jira.credentials = {
	"username" : username,
	"password" : password
	};
}

jira.getAllIssues = function(JQLQuery, callback){
	//first fetch the number of issues;
	var authorization,headers = {};
	if (jira.credentials)
		authorization = "Basic " + new Buffer(jira.credentials.username + ":" + jira.credentials.password).toString('base64');
	if (authorization)
		headers.authorization = authorization;
	headers["Content-Type"] = "application/json";	
	var urlPath = jira.urlServer + "/rest/api/2/search" + "?" + querystring.stringify({
				jql : JQLQuery,
				maxResults: 0});	
	request.get({
		"url" : urlPath,
		"headers" : headers
	},function (error,responce){
			if (error){
				return callback(error,null);
			}			
			var numberOfIssues = JSON.parse(responce.body).total;			
			urlPath = jira.urlServer + "/rest/api/2/search" + "?" + querystring.stringify({
				query : JQLQuery,
				maxResults: numberOfIssues});
			request.get({
				"url" : urlPath,
				"headers" : headers
			}, function (error,responce){
				if(error){
					return callback(error,null);
				}
				var returnObj = JSON.parse(responce.body);				
				callback(null, returnObj);
			});

	});
}
