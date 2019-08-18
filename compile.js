var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var slash = process.platform === "linux" ? "/" : "\\";
cmd = `java -jar closure-compiler-v20190729.jar`
	+ ` --compilation_level ADVANCED`
	+ ` --language_in=ECMASCRIPT6`
	+ ` --language_out=ECMASCRIPT6`
	+ ` --rewrite_polyfills=false`
	+ ` --js "src${slash}**.js"`
	+ ` --entry_point src${slash}index`
	+ ` --js_output_file bin${slash}index.html`
	+ ` --output_wrapper "<script>(function(){%output%})()</script>"`;

exec(cmd, function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	console.log(error);
});
