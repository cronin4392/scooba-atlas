var sass = require('node-sass');
var autoprefixer = require('autoprefixer');
var fs = require('fs');
var combinemq = require('combine-mq');
var debug = false;

var input_file = "./src/css/main.scss";
var output_file = './build/css/main.css';

if (process.env.NODE_ENV !== "production"){
	debug = true;
}

try {
	var render_css = sass.renderSync({
		file: input_file,
		outputStyle: (debug ? 'nested' : "compact"),
		sourceComments: debug
	});
	var prefixed = autoprefixer.process(render_css.css).css;
	if (debug) {
		// Development
		fs.writeFile(output_file, prefixed, function(err,data){
			process.exit(code=0);
		});
	} else {
		// Production
		var optimized = combinemq.parseCssString(prefixed, {
			beautify : debug
		});
		fs.writeFile(output_file, optimized, function(err,data){
			process.exit(code=0);
		});
	}


}catch(err){
	process.stderr.write('SCSS COMPILATION ERROR\n');
	process.stderr.write(JSON.stringify(err));
	process.stderr.write('\n');
	process.exit(code=0);
}