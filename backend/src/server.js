const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
require('dotenv').config();
const port = process.env.PORT 
const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send({
        message: 'api is working'
    });
});

app.listen(port, async()=> {
    try{
        await connection
        console.log('mongoDB is connected')
    } catch (err) {
        console.log(err.message)
    }
    console.log('server is running on port ' + port)
});