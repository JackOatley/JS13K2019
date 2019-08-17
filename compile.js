var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

cmd = "java -jar closure-compiler-v20190729.jar"
	+ " --compilation_level ADVANCED"
	+ " --language_in=ECMASCRIPT6"
	+ " --language_out=ECMASCRIPT6"
	+ " --rewrite_polyfills=false"
	+ " --js `find ./src/ -name '*.js'`"
	+ " --entry_point src/index"
	+ " --js_output_file bin/index.html"
	+ " --output_wrapper '<script>(function(){%output%})()</script>'";

exec(cmd, function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	console.log(error);
});
