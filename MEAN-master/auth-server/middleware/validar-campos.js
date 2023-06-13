const { validationResult } = require('express-validator');

 
const validarCampos = (req, res=response, next) => {
 
   // si hay errores devuelvo
   const errors = validationResult(req);
   console.log(errors);
 
   if (!errors.isEmpty()){
       return res.status(400).json({
           ok:false,
           errors:errors.mapped()
       })
   }
 
   // next es una función que se llama cuando todo sale bien
   next();
}
 
 
module.exports = {
   validarCampos
}
