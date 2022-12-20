var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//File upload API route
app.route('/api/fileanalyse').post(multer().single('upfile'), async(req, res) => {
  try {
    res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
   });
  } catch (err) {
    console.log(err)
  }
})