var async = require('async');
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
var duplicate = function(input, times) {
	times = typeof times !== 'undefined' ? times : 2;
	
	var output = '';

	for(var i=0; i<times; i++) {
		output += '<span>' + split(input) + '</span>';
	}
	
	return output;
}
swig.setFilter('duplicate', duplicate);

var file_sets = [['./src/index.html', './build/index.html'], ['./src/blog.html', './build/blog.html']];
var data_file = './src/data/main.json';
var stevie_file = './src/views/partials/stevie-alt.txt';
var stevie_file_small = './src/views/partials/stevie-medium.txt';

if (process.env.NODE_ENV !== "production"){
	debug = true;
}

var data = JSON.parse(fs.readFileSync(data_file));
var stevie = String(fs.readFileSync(stevie_file));
var stevie_small = String(fs.readFileSync(stevie_file_small));
data['stevie'] = stevie;
data['stevie_small'] = stevie_small;

async.each(file_sets, function(files) {
	var input_file = files[0];
	var output_file = files[1];

	var template = swig.compileFile(input_file);
	var html = template(data);

	try {
		fs.writeFile(output_file, html, function(err,data){
			process.exit(code=0);
		});
	}catch(err){
		process.stderr.write('HTML BUILD ERROR\n');
		console.log(err);
		// process.stderr.write(err);
		// process.stderr.write('\n');
		process.exit(code=0);
	}
});