const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_URI
const DATABASE_NAME = process.env.DATABASE_NAME


const connectDB = async () => {
  return mongoose
    .connect(`${URI}/${DATABASE_NAME}`)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectarse : ', err))
}

module.exports = connectDB