const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json()) //interpretar o json do body
    app.use(cors())  // permitir que a aplicação frontend comunique-se com a backend
}