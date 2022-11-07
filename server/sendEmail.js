var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

module.exports = async (email, subject, text) => {
  var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
            callback(err);                 
          }
          else {
              callback(null, html);
          }
      });
  };

  transporter = nodemailer.createTransport(({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
          user: "foodieeats.team",
          pass: process.env.EMAIL_PWD
      }
  }));

  readHTMLFile('mail.html', function(err, html) {
      if (err) {
        console.log('error reading file', err);
        return;
      }
      var template = handlebars.compile(html);
      var replacements = {
          password: text
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
          from: process.env.USER,
          to : email,
          subject : `FoodieEats: ${subject}`,
          html : htmlToSend
      };
      transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
          }
      });
  });
}