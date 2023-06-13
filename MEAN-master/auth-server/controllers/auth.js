// para el tipado
const {response} = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { db } = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
 
 
const crearUsuario = async (req, res=response) => {
    console.log(req.body); // imprimo el body
 
    const {email,name,password} = req.body;
 
    // verificar email
    try {
        console.log(Usuario);
        const usuario = await Usuario.findOne({email})
        if (usuario){
            return res.status(400).json({
                ok:false,
                msg:'El mail ya existe'
            });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Porfa hable con el admin'
        });
    }
 
    // crear usario en la DB
    const dbUser = new Usuario(req.body);

    // hash
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password,salt);

    await dbUser.save();


    // generar JWT
    const token = await generarJWT(dbUser.id,name);


 

    // respuesta
    return res.status(201).json({
        ok:true,
        msg:'Ingreso exitoso',
        uid:dbUser.id,
        token
        //name, // puedo escribirlo directamente pues es el de arriba
    });    
 

 
}


const loginUsuario = async (req, res=response) => {
    const {email, password} = req.body;
  
    try {
        // que exista el mail
        const dbUser = await Usuario.findOne({email})
        if (!dbUser){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }
        // que las contrasenias coincidan
        const validPassword = bcrypt.compareSync(password,dbUser.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }
        // todo ok a partir de ahora
        // generar JSON Web Token de la contrasenia
        const token = await generarJWT(dbUser.id,dbUser.name);
        return res.json({
            ok:true,
            msg:'Auth exitosa',
            uid:dbUser.id,
            name:dbUser.name,
            token
        })
 
    } catch (error){
        return res.status(500).json({
            ok:false,
            msg:'Hable con el admin.'
        })
    }
}

 
const revalidarToken = async (req, res) => {

    console.log('algo');

    const {uid, name} = req;
 
    // genero token
    const token = await generarJWT(uid,name);
 
    return res.json({
        ok:true,
        msg: 'Renew',
        uid,
        name
    })
}


 
 
// exportamos
module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}
