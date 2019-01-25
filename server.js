var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  const output = `
    <p>You have a new contact request</p>
    <h3>contact details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'webmail',
    host: 'mail.bcts.ca',
    port: 465,
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log("req.body.email: ", req.body.email);

  // setup email data with unicode symbol
  var mailOptions = {
    from: `nodemailer contact ${req.body.email}`,
    to: 'hindreen@bcts.ca',
    subject: 'User Form Contact',
    html: output
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send({
      msg: 'Email has been sent!'
    });
  });
});

app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});