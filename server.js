const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const os = require('os');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
var app = express();
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;
    fs.appendFile('server.log', log + os.EOL, (err) => {
        if(err) {
            console.log('Unable to log into file');
        }
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (textToScreem) => {
    return textToScreem.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('homepage.hbs', {
        title: "Homepage",
        welcomeMessage: "This is the welcome message"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About page 2"
    });
});

app.get('/json', (req, res) => {
    res.send({
        name: 'Daniele',
        age: 31
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "You've hade an error"
    })
});

app.listen(port, () => {
    console.log(`Server is ready to listen on port ${port}`);
});
