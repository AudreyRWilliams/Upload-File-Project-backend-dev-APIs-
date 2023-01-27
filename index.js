//calling all the required packages
var express = require('express')
var cors = require('cors')
require('dotenv').config()
const multer = require("multer");

var app = express()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//configurations for static files
app.set("view engine",'ejs')
app.use(express.static(`${__dirname}/public`))

//Configuration for Multer
const upload = multer({ dest: "public/files"})

//API endpoint below .......
app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
