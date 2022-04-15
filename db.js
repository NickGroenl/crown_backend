const mongoose = require("mongoose");
const config = require('./config');

const options = {
    readPreference: "primaryPreferred",
    ssl: true,
    keepAlive: true,
    connectTimeoutMS: 200000,
    socketTimeoutMS: 200000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGODB_URI = config.MONGO_URI;

mongoose.connect(MONGODB_URI, options)
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err))
