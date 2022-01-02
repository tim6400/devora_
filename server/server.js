var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

var app = express();

app.use(bodyParser.json());

app.use(cors())

app.options('*', cors())



app.get('/api/test', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.post('/api/time', function (req, res, next) {

    // validate body

    // Check if has startTime and endTime prop
    if (!req.body.hasOwnProperty('startTime') || !req.body.hasOwnProperty('endTime')) {
        return res.status(400).send({
            message: 'No startTime or endTime property found'
        });
    }

    // Check if start bigger the end
    var startDate = new Date(req.body.startTime);
    var endDate = new Date(req.body.endTime);

    // Check if both property is of type date
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        return res.status(400).send({
            message: 'startTime or endTime property not type of date'
        });
    }

    if (endDate < startDate) {
        return res.status(400).send({
            message: 'The endDate is bigger then startDate'
        });
    }

    // Data is valid

    // Read from file
    let rawdata = fs.readFileSync('reportData.json');
    let time = JSON.parse(rawdata);

    // Add new data 
    time.push({ startTime: startDate, endTime: endDate });

    // Save data to file
    let json = JSON.stringify(time);
    fs.writeFileSync(path.join(__dirname, "./", "reportData.json"), json)

    res.json({ success: "Updated Successfully", status: 200 });
})

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 8080')
})