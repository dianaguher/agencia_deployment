//const express = require('express'); //commonjs
import express from 'express'; //module
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from "dotenv";
dotenv.config({path:'variables.env'});

const app = express();

//conectar BD
db.authenticate()
    .then(()=>console.log('Base de datos conectada...'))
    .catch(error=>console.log(`Este es el error:*********${error}`))

//definir puerto
//const port = process.env.port || 4000;

//habilitar pug
app.set('view engine','pug');

//obtener el annio actual
app.use((req,res,next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

//agregar el body parser para leer los datos del dormulario
app.use(express.urlencoded({extended:true}));

//definir la capeta public
app.use(express.static('public'));

//agregar router
app.use('/',router);

//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000

app.listen(port,host, ()=>{
    console.log(`El servidor esta funcionando`);
});