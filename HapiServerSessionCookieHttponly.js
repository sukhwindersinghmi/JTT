var express = require('express');
var app = express();

app.disable('X-Powered-By');

// Register templating engine
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/insecure_script");

app.get('/', function(req, res) {
res.sendFile('index');
});

var server = app.listen(3000, function() {
var port = server.address().port;
console.log('Your app listening at http://localhost:%s', port);
});

The insecure_script folder contains index.html file with the below code

<html>
<head>
</head>
<body>
This is some text
<p>
This script doesn't fire the trigger
<script src="js/stupid_client_script.js"></script>
This script fires the trigger
<script src="http://www.example.com/example.js"></script>
<script src="http://www.wordpress.com/dod.js"></script>
<script src="http://www.shoes.com/act.js"></script>
This is the text src="http://www.example.com" in the HTML text, but not as part of script.
</p>
<p>
<script src="https://www.example.com/securejs.js"></script>
The last example is accessed over HTTPS and should be a "pat on the back."
</p>
</body>
</html>
