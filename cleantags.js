//used to remove non-descriptive tags from people who write sentences in their tags
//because it doesnt work when weasyl arranges them alphabetically
//taken from wikipedia list of top 100 common english words
var commonwords = [
	'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
	'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
	'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
	'or', 'an', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
	'so', 'out', 'if', 'about', 'get', 'which', 'when', 'like', 'just',
	'him', 'know', 'take', 'into', 'your', 'some', 'could', 'them', 'see',
	'than', 'then', 'now', 'look', 'only', 'its', 'over', 'also', 'use',
	'our', 'these', 'any', 'most'
];

function cleantags(array) {
	return array.filter(function(i) {return commonwords.indexOf(i) < 0;});
}