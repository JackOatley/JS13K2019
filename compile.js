var exec = require('child_process').exec;
var slash = process.platform === "linux" ? "/" : "\\";
cmd = `java -jar closure-compiler-v20190729.jar`
	+ ` --externs src${slash}externs.jsx`
	+ ` --compilation_level ADVANCED`
	+ ` --language_in=ECMASCRIPT6`
	+ ` --language_out=ECMASCRIPT6`
	+ ` --rewrite_polyfills=false`
	+ ` --js "src${slash}**.js"`
	+ ` --entry_point src${slash}index.js`
	+ ` --js_output_file bin${slash}index.html`
	+ ` --output_wrapper "<head><meta name="monetization"content="$twitter.xrptipbot.com/f_oatley"><style>canvas{position:absolute;width:960px;height:540px;image-rendering:pixelated;}</style></head><body><script>(function(){%output%})()</script></body>"`;

exec(cmd, function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	console.log(error);
	// AUTOZIP
	//exec(`advzip -a bin/index.zip bin/index.html -i 1000 -4`, function (error, stdout, stderr) {
		//console.log(stdout);
		//console.log(stderr);
		//console.log(error);
	//});
});
