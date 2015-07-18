var fs = require('fs');

var keywords;

var dummy_facts;
var tucson_facts;
var politics_facts;
var economics_facts;
var research_facts;
var weather_facts;
var cactus_facts;
var family_friendly_activities_facts;
var downtown_scene_facts;
var user_facts;



/* Extract keywords from an array */
var extract_keywords = function(array, lower, upper) {
	var keywords = []
	var returning = [];
	var entry = { word: "the", quantity: 0};
	keywords.push(entry);
	var i ,j;
	for(i = 0; i < array.length; i++) {
		var words = array[i].split(" ");
		for(j = 0; j < words.length; j++) {
			var k = 0;
			var foundFlag=0;
			for(k=0; k < keywords.length && foundFlag === 0; k++) {
				if(keywords[k].word === words[j]) {
					foundFlag = 1;
					keywords[k].quantity++;
				}
			}
			if(foundFlag === 0) {
				var entry = {word: words[j], quantity: 1};
				keywords.push(entry);
			}
		}
	}
	var k;
	for(k = 0; k < keywords.length; k++) {
		if(keywords[k].quantity >= lower && keywords[k].quantity < upper && keywords[k].word.length > 2) {
			returning.push(keywords[k]);
			 console.log(keywords[k].quantity + " - " +  keywords[k].word);
		} else if (keywords[k].word.substring(0,1) === '_') {
			returning.push({word: keywords[k].substring(1), iteration: 0});
			// console.log(keywords[k].quantity + " - " +  keywords[k].word);
		}
	}
	return keywords;
}




/* Extract lines from a file and put them into an array, using split('\n'); */
var data_file_to_array = function(filename, array) {
	var array;
	var data = fs.readFileSync(filename, 'utf8');
	
	array = data.split('\n');
		var line;
/*
		console.log("Contents of " + filename + ":");
		
		var linenum=0;
		for(line in array) {
			//console.log(linenum + " - " + array[linenum]);
			linenum++;
		}
*/
	return array;
}

/* Tells us the index of a keyword in the keyword array */
var getIndex = function(keyword, array) {
	var i;
	for(i=0; i<array.length; i++) {
		if(keyword === array[i].word) {
		  return i;
		}
	}
	return -1;
}


var dump_array = function(array) {
		var line;
		var linenum=0;
		console.log();
		console.log("running dump_array");
		for(line in array) {
			console.log(array[linenum]);
			linenum++;
		}
}

/* Returns the entire line containing a keyword */
var grep = function(keyword, array) {
	console.log("Trying to match " + keyword);
	var i, j;
	for(i = 0; i < array.length; i++) {
		console.log("searching for " + keyword + " in the line: " + array[i]);
		words = array[i].split(' ');
			for(j = 0; j < words.length; j++)
				if(words[j] === keyword)
					return array[i];
	}
	return " I am so confused... "

}

tucson_facts = data_file_to_array('tucson_facts.txt');
dummy_facts = data_file_to_array('dummy_text');

	function initiate(specialty) {
		switch(specialty) {
			default: fact_db = tucson_facts;
		}
	}

keywords = extract_keywords(tucson_facts, 3, 50);

function someOtherName(str, history) {
	var i;
	for(i=0;i<str.length;i++) {
		var x = str.substring(i,i+1);
		if(x === '.' || x === ',' || x===';')
			return "I am a cactus - Please do not use funny symbols like period and comma";
	}
  history.log = history.log || [];
  history.log.push(str);
	var index = -1;
	var j = 0;
	var words = str.split(' ');
	for(j=0; j < words.length && index === -1; j++) {
		index = getIndex(words[j], keywords);
	}
	/*if(index !== -1)
		console.log("Found index " + index + " for keyword " + words[j]);
	else
		console.log("Didn't find any of the keywords"); */

	var q;
	var qflag = words[words.length-1].substring(words[words.length-1].length-1) === '?';
	if(qflag)
		q = "You know, I don't really like to answer questions -- I'm a cactus -- ";
	else
		q = "";

	if(index !== -1) {
		var relevantFact = grep(words[j-1], tucson_facts)
		if(!qflag) 
			return "That's interesting --  Did you know that " + relevantFact + "?";
		else
			return q + "Let me ask you a question -- Did you know that " + relevantFact + "?";
	} else {
		if(!qflag)
			return "I see -- Tell me more about " + words[Math.floor(Math.random()*words.length)];
		else
			return q + "Tell me more about " + words[Math.floor(Math.random()*words.length)];
	}
	
}

module.exports.respondTo = someOtherName;
