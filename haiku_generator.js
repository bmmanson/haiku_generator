var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

var syllablesArr = [[], [], [], [], [], [], [], [], [], [], [], [], []];

function countSyllables(str){
  var matches = str.match(/[1234567890]/g);
  return matches === null ? 0 : matches.length;
}

 function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function createArray(data){    
   var lines = data.toString().split("\n"), lineSplit, index;
   lines.forEach(function(line){    
    lineSplit = line.split("  ");
    index = parseInt(countSyllables(lineSplit[1]));
    if (typeof index === 'number' && index > 0 && index < 13 && !/\W/.test(lineSplit[0])) {
      syllablesArr[index].push(lineSplit[0]);
    }    
  });   
}

createArray(cmudictFile);

pattern = [[5],[7],[5]];

function generateHaiku(structure){
	var lines = [];
	for (var i = 0; i < structure.length; i++) {
		var line = [];
		for (var j = 0; j < structure[i].length; j++) {
			var lengthOfIndexInWordArray = syllablesArr[structure[i][j]].length;
			var randomNumber = Math.floor(Math.random() * lengthOfIndexInWordArray);
			line.push(syllablesArr[structure[i][j]][randomNumber]);
		}
		line = line.join(" ");
		lines.push(line[0] + line.slice(1).toLowerCase());
	}
	return "\n" + lines.join("\n") + "\n";
}

console.log(generateHaiku(pattern));