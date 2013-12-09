#!/usr/bin/env node
var jira = require("../lib/main");
jira.setServer("serverName");
jira.setCredentials("user","password");
jira.getAllIssues('issuetype = "IssueTypename" AND createdDate > -3d',function(err,result){
	console.log(result.issues[0]);
});
console.log("bla");

