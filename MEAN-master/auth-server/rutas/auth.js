const { Router } = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();
 


// controlador de la ruta; en este caso para agregar un usuario
// obs: los midlewares se ejecutan secuencialmente
router.post('/new',
   [check('name','El nombre es obligatorio').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   check('password','Password de al menos 6 letras').isLength({min:6}),
   validarCampos],
   crearUsuario)
 
 
// login;
// los args son: ruta, un arreglo de midlewares y el controlador
router.post('/',
   [check('email','El email es obligatorio').isEmail(),
   check('password','Password de al menos 6 letras').isLength({min:6}),
   validarCampos],
   loginUsuario)
 
 
// validar y revalidar el token
router.get('/renew', validarJWT,revalidarToken);
 
 
 
// lo exporto
module.exports = router;