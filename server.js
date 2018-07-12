const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String,
  birthday: String,
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.post('/contact/create', function (req, res) {
  console.log(req.body)
  new Contact(req.body)
    .save()
    .then((doc) => res.json({id: doc.id}))
    .catch((err) => res.status(500).end(err.message))
});

app.get('/contact', function (req, res) {
  Contact.find({}, (err, docs) => {
    if(err) res.status(500).end(err.message)
    else res.json(docs)
  })
});

app.get('/contact/:id', function (req, res) {
  Contact.findById(req.params.id, (err, doc) => {
    if(err) res.status(500).end(err.message)
    else res.json(doc)
  })
});

//REMOVE
app.post('/contactremove', function (req, res) {

  Contact.findByIdAndRemove(req.body.id, (err, doc) => {
    if(err) res.status(500).end(err.message)
    else res.json(doc)
  })
});

//UPDATE
app.post('/contactupdate', function (req, res) {

  Contact.findByIdAndUpdate(req.body.id, {name:req.body.name}, (err, doc) => {

    if(err) res.status(500).end(err.message)
    else

    res.json(doc)
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
