const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose');

const app = express()

// cofigure enviorment variables
env.config()
// Middleware to pass incoming request
app.use(express.json())
// mongoose connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_DB_USER}:${process.env.MONGODB_DB_PASSWORD}@cluster0.kx9pm.mongodb.net/${process.env.MONGODB_DB_DBNAME}?retryWrites=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:true
    }).then(()=>{
        console.log("connected to dtabase successfully")
    }).catch((err)=>{
        console.log(err)
    })

app.use('/api',require('./Routes/index'))

app.listen(process.env.PORT, (PORT, err) => {
    console.log(`server is running on ${process.env.PORT}`);
})