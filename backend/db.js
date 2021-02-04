const mongoose = require('mongoose')

const dbConnect = () => {
    mongoose.connect('mongodb://mongodb:27017/test', { useNewUrlParser: true })
}
const db = mongoose.connection
db.on('error', console.error.bind(console, "Connection Error"))
db.once('open', () => {
    //we are connected
    console.log('Connected to MONGODB!!!');
})
module.exports = dbConnect