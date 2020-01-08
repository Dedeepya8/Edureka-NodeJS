const express = require('express'); 
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const moment = require('moment');
var db = mongoose.connect('mongodb://127.0.0.1:27017/bugdata');
var bug = require('./models/bugmodel');

const bodyParser = require('body-parser');

const port = 3000;
const app = express();
let d1 = moment();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res)=>{
    bug.find((err,data)=>{
        if(err) throw err;
        for(var i=0; i < data.length; i++){
            let d2 = data[i].date;
            let d = d1.diff(d2, 'days')
            data[i].days = 3 - d;
        }
        res.render('index.ejs', {data:data})
    })
})

app.post('/addData', (req,res)=>{
    bug.create(req.body, (err, data)=>{
        if(err)
            res.status(500).send(err);
        else  
            console.log('data inserted')  
            res.redirect('/');
    })
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});
