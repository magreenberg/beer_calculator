var express = require('express')
var bodyParser = require('body-parser')
var eu_litres_per_keg = 50;

var app = express()

app.listen(8080, function(){
    console.log('Running on 8080');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('images'));

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('hello');
})

app.get('/calculate', function(request, response) {
    var thirsty_associates = parseInt(request.query.thirsty_associates);
    var half_litre_mugs = parseInt(request.query.half_litre_mugs);


    if (isNaN(thirsty_associates)) {
    	response.send("Number of thirst associates is not valid.")
    } else if (isNaN(half_litre_mugs)) {
        response.send('Number of half_litre_mugs per engineer is not valid.')
    } else {
    	var tot_half_litre_mugs = thirsty_associates * half_litre_mugs;
    	var tot_kegs = eu_litres_per_keg / tot_half_litre_mugs;

        var answer = 'For ' + (thirsty_associates).toString() + ' thirsty associates order ' + (tot_kegs).toString() + ' kegs of beer.';

        response.send(answer.fontsize(20));
    }
})




