var fs = require("fs");
var cmudictFile = readTextFile('./cmudict.txt');
var poeticsText = eraseNewLines(readTextFile('./poetics.txt'));

var syllablesObj = {};
var poems = [];

function wordWithoutSpecialCharacters(str){
	return str.replace(/[\W]/g, "").toUpperCase();
}

function eraseNewLines(str){
	return str.replace(/["\n"]/g, " ");
	//str = str.replace(/[])
}

function countSyllables(str){
  var matches = str.match(/[1234567890]/g);
  return matches === null ? 0 : matches.length;
}

 function readTextFile(file){
  return fs.readFileSync(file).toString();
}

function createObj(data){    
   var lines = data.toString().split("\n"), lineSplit, syllables;
   lines.forEach(function(line){    
    lineSplit = line.split("  ");
    syllables = parseInt(countSyllables(lineSplit[1]));
    syllablesObj[wordWithoutSpecialCharacters(lineSplit[0])] = syllables;
  });   
}

createObj(cmudictFile);
var poeticsArray = poeticsText.split(" ");

function generateHaiku(arr) {
	var output = "";
	var pattern = [5, 7, 5];
	for (var i = 0; i < arr.length; i++) {
		if (pattern[0] < 0) {
			return false;
		} else if (pattern.length === 1 && pattern[0] === 0) {
			return output + "\n";
		} else if (pattern[0] === 0) {
			pattern.shift();
			output += "\n";
		}

		if (syllablesObj[wordWithoutSpecialCharacters(arr[i])]){
			output += arr[i] + " ";
			pattern[0] = pattern[0] - syllablesObj[arr[i].toUpperCase()];
		} else {
			return false;
		}
	}	
}

function searchThroughArrayForHaikus(textFileArray){
	var output = [];
	for (var i = 0; i < textFileArray.length; i++) {
		if (i + 16 > textFileArray.length) {
			return output;
		} else if (generateHaiku(textFileArray.slice(i, i + 16))) {
			output.push( generateHaiku(textFileArray.slice(i, i + 16)) );
		}
	}
}

//console.log(poeticsArray);

console.log(searchThroughArrayForHaikus(poeticsArray).join("\n"));
