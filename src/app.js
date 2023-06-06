const path = require('path')
const express = require('express')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars');
const hbs = require('nodemailer-express-handlebars')


const app = express()
const port = 3333

const smtp = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'email@gmail.com',
    pass: 'emailpassword'
  },
  tls: {
    rejectUnauthorized: false,
}
})

const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve('./src/templates'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/templates'),
  extName: ".html",
}

smtp.use('compile', hbs(handlebarOptions))

handlebars.registerHelper('isIllustrator', function (variable) {
  if ( variable === true) {
    return true
  } else {
    return false
  }
});

const configEmail = {
  from: 'email@gmail.com',
  to: 'email2@gmail.com',
  subject: 'Templates de email MinhaCena',
  template: 'generic-email', /* illustrator-approved | illustrator-disapproved | institution-approved | institution-disapproved */
  context: {
    name: 'Nome',
  }
}

smtp.sendMail(configEmail, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});



app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})