const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/usermodel');
const Product = require('../models/productmodel');
const session = require('express-session');
const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();

router.use(session({secret: 'secret1', resave: false, saveUninitialized: true}));
app.set('view engine', 'ejs');
app.set('views', './views');
//const admin_pass = bcrypt.hashSync('n b', 8)
// User.create({
//     name : 'admin',
//     email: 'admin@yahoo.com',
//     password : admin_pass,
//     type: 'admin',
//     orders: [{}]
// })
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email: req.body.email,
      password : hashedPassword,
      type: 'user',
      orders: [{}]
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 
      });
      const string = encodeURIComponent('Successfully Registered. Please Login.');
      res.redirect('/?msg=' + string);
    }); 
  });

  router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      const string = encodeURIComponent('! Please enter valid value');
      if (!user) { res.redirect('/?valid=' + string);}
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 
        });
        localStorage.setItem('authtoken', token)        
      }
      console.log(user.type)  
      if (user.type == 'user'){
          Product.find((err, pdata)=>{
            res.render('userDashboard.ejs', {userdata: user.name, productdata: pdata});
          })        
      }
      else
      res.render('adminDashboard.ejs', {data: user.name});
    });

});

module.exports = router;

