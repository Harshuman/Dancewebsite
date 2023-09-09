const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlPaser: true});
const bodyparser = require('body-parser');
const port = 80;

var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    adress: String,
    email: String,
    desc: String
})
var contact = mongoose.model('contact', contactschema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
res.send('This item has been saved to the data base')
    }).catch(()=>{
        res.status(400).send('Item was not save to the data base')
    })
    // res.status(200).render('contact.pug');
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
