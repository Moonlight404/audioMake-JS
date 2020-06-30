const fs = require('fs');
const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors({origin: 'http://localhost:5500'}));
 
app.get('/audios', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var fs = require('fs');
    var files = fs.readdirSync('audios');    
    res.send(files)
})
 
app.listen(3000)