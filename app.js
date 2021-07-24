const express = require('express');
const mongoose = require('mongoose');
const app = new express();
const routes = require('./routes/index');
const envController = require('./services/envController');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(routes);

//mongodb connection start
mongoose.set('useUnifiedTopology',true)
mongoose.set('useNewUrlParser',true)
mongoose.connect(envController.connectionString())
.then((status)=>console.log('connected'))
.catch((error)=>console.log('not connected'));
//mongodb connection end





app.use(errorHandler);
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`server running at ${port}`))