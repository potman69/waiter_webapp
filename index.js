const express = require('express');
const exphbs = require('express-handlebars');
const Waiters = require('./waiters');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/anton-waiter');
const app = express();
const waiters = Waiters(models);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.get("/",function(req, res){
  res.redirect('/index');
});

app.get('/waiters/:username', waiters.index);
app.post('/waiters/:username', waiters.index);
app.get('/days', waiters.days);



const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Web app started on port : ' + process.env.PORT || port);
});
