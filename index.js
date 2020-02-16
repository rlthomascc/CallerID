const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))




const client = require('twilio')(SID, token);

let sendSMS = async (e) => {
    console.log(e);
    client.messages.create({
        body: `Name: ${e.FullName} | Phone: ${e.Phone} | Address: ${e.Address} | Message: ${e.Message}`,
        from: '+12092555830',
        to: '+12092852580',
    })
}


app.post('/callerId', async (req, res) => {
    console.log(req.body, req.query)
    await db.ColdLead.find({ Phone1: req.body.From }, async (err, docs) => {
        console.log(docs, docs.length)
        if (docs.length > 0) {
            await sendSMS({
                FullName: docs[0].FirstName + " " + docs[0].LastName,
                Phone: docs[0].Phone1,
                Address: docs[0].Address,
                Message: req.body.Body
            })
        };
    });
    await db.ColdLead.find({ Phone2: req.body.From }, async (err, docs) => {
        console.log(docs, docs.length)
        if (docs.length > 0) {
            await sendSMS({
                FirstName: docs[0].FirstName + " " + docs[0].LastName,
                Phone: docs[0].Phone1,
                Address: docs[0].Address,
                Message: req.body.Body
            })
        };
    });

})

let port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
