const express = require('express');
const app = express();  
require('dotenv').config();
require('./Models/db');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')

const PORT = process.env.PORT || 8081;



app.use(express.json());
app.use(cors());
app.get('/ping', (req,res)=>{
    res.send('PONG');
})

app.use('/auth', AuthRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})