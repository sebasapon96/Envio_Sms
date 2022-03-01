const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

const request = require("request-promise")


app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization, Origin, X-Requested-With, Accept, Cache-Control",
  preflightContinue: true,
  optionsSuccessStatus: 204,
}));

app.options('*', cors(), ((req, res, next) => {
  console.log(req, res, next);
  res.send('CORS Allow');
}));


app.post('/service/ftp/tyj/masivian',  function (req, res, next) {
  console.log("Getting POST request from: ", req.ip, new Date().toISOString())

  if (req.headers["nro-cel"] === undefined) {
    // 500 Internal Server Error
    return res.status(500).send("The rta-ftps not send in the header of HTTP");
}

if (req.headers["nro-cel"] === "") {
  // 500 Internal Server Error
  return res.status(500).send("The ruta-ftps not send in the header of HTTP");
}

const nrocel = req.headers["nro-cel"] ;
console.log(nrocel);

var url = 'https://api-sms.masivapp.com/smsv3/sms/messages';
var url1='https://api-sms.masivapp.com/SmsHandlers/sendhandler.ashx?Action=sendmessage&username=FiduciariaCoomevaCanalesVirtuales_NFLKZ&password=XN5jCDFq]$&recipient=57' + nrocel + '&messagedata=Prueba mensajaria de texto Fiducoomeva&longMessage=false&url=https://masiv.com/%26flash=false%26premium=false/SmsHandlers/sendhandler.ashx?'
var data = {
            originator: "87007",
            to: "57" + nrocel,
            text:" Fiducoomeva S.A. informa la consulta/descarga de certificado de Retención en la fuente o GMF o Saldo a trav?s del portal transacciona",
            customdata: "CUS_ID_0125",
            isPremium: false,
            isFlash: false,
            isLongmessage: false,
            isRandomRoute: false,
            shortUrlConfig: {
            url: "https://www.youtube.com",
            domainShorturl:"htp//ma.sv/" 

            
 
            
          }
        }; 

       
        

     fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
         'Authorization': 'token',
        'Content-Type': 'application/json' 
      }
    }).then(res => res.json())
    .catch(error => res.error('Error:', error))
    .then(response => res.send(response))
   


});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});