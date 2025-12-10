//connect to mongodb database

const mongoose = require('mongoose');

const mongo_url= process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongo_url)
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});