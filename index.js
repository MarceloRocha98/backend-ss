const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

const fileUpload = require('express-fileupload');
app.use(fileUpload());


const express=require('express')
app.use(express.static(__dirname + '/api')) 

app.db=db //adiciona dentro do express() o banco de dados

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    // .then('./api')
    .then('./api/auth.js')
    .then('./api/contact.js')
    .then('./api/payment.js')
    .then('./api/serviceArea.js')
    .then('./api/services.js')
    .then('./api/user.js')
    .then('./api/validation.js')
    .then('./config/routes.js')
    .into(app)  // injeta app(express) nas paginas citadas, que vai utiliza-lo como parâmetro

app.listen(8080, () => {
    // console.log('backend executando')
})