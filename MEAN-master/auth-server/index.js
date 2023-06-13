const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); // vars. de entorno
 
// crear el servidor/app de express
const app = express();
 

// con. a la BD
dbConnection();
 

// Directorio público
app.use(express.static('public'))

// CORS
app.use(cors());
 
 
// para lectura y parseo del body
app.use(express.json());


//console.log(process.env) // imprimir vars. de entorno
  
// rutas
app.use('/api/auth', require('./rutas/auth'))
 
 
/** las rutas son
* locahost:4000/api/auth/
* locahost:4000/api/auth/new
* locahost:4000/api/auth/renew
*/
 
 
//
app.listen(4000, () => {
   console.log(`Escuchando en el puerto ${ process.env.PORT }`)
})
