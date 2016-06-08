var swig = require('swig');
var fs = require('fs');
var debug = false;

function chunkString(str, length) {
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
var split = function(input, size) {
	size = typeof size !== 'undefined' ? size : 1;
	var split = chunkString(input, size);
	var output = '<span>';
	output += split.join('</span><span>');
	output += '</span>';
	return output;
}
swig.setFilter('split', split);

var input_file = "./src/index.html";
var output_file = './build/index.html';
var data_file = './src/data/main.json';

if (process.env.NODE_ENV !== "production"){
	debug = true;
}

try {
	var data = JSON.parse(fs.readFileSync(data_file));
	var template = swig.compileFile(input_file);
	var html = template(data);

	fs.writeFile(output_file, html, function(err,data){
		process.exit(code=0);
	});

}catch(err){
	process.stderr.write('HTML BUILD ERROR\n');
	process.stderr.write(err);
	process.stderr.write('\n');
	process.exit(code=0);
}