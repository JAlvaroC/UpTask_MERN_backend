import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import {emailOlvidePassword, emailRegistro} from '../helpers/email.js'


const registrar = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();   
    await usuario.save();
    // const usuarioAlmacenado = await usuario.save()//guarda en mongo
    // await usuario.save()//guarda en mongo x2
    // Enviar el email de confirmacion
    // console.log(usuario);
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    // res.json(usuarioAlmacenado)
    res.json({
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El Password es Incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar =async (req,res)=>{
    const {token}=req.params
    // console.log(token);
    const usuarioConfirmar=await Usuario.findOne({token})

    if ( !usuarioConfirmar) {
        const error = new Error('Token no válido')
        return res.status(403).json({msg:error.message})
    }

    try {
        usuarioConfirmar.confirmado=true;//cambiar el estado
        usuarioConfirmar.token="";//vaciar el token
        await usuarioConfirmar.save();
        res.json({msg:'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error);
    }
  }
  
  const olvidePassword=async (req,res)=>{
    const {email}=req.body
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const error = new Error("El Usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token=generarId()
        await usuario.save()

        //Enviar el email
        emailOlvidePassword({
          email: usuario.email,
          nombre: usuario.nombre,
          token: usuario.token,
        })

        res.json({msg:'Hemos enviado un email con las instrucciones'})

    } catch (error) {
      console.log(error);
    }

  }
  const comprobarToken=async(req,res) => { 
    const {token}=req.params;

    const tokenValido=await Usuario.findOne({token})
    if(tokenValido){

      res.json({msg:"Token válido y el Usuario Existe"})
    }else{
      // console.log('Token no valido');
      const error = new Error("Token no válido")
      return res.status(404).json({msg:error.message})
    }
  }
  const nuevoPassword=async(req,res) => { 
    const {token}=req.params
    const {password}=req.body

    const usuario=await Usuario.findOne({token})

    if(usuario){
      usuario.password=password;
      usuario.token='';      
      try {
        await usuario.save()
        res.json({msg:'Password Modificado corectamente'})
        
      } catch (error) {
        console.log(error);
      }
    }else{

      const error = new Error('Token no valido')
      return res.status(404).json({msg:error.message})

    }

   }
  const perfil = (req,res) => { 
    
      const {usuario}=req
      res.json(usuario)
      
    }


// // Contnroladores

// import generarId from "../helpers/generarId.js";
// import Usuario from "../models/Usuario.js";



// const registrar=async(req,res)=>{
//     // Evitar registros duplicados
//     const {email}=req.body
//     const existeUsuario=await Usuario.findOne({
//         email
//     })
//     console.log(existeUsuario);
//     // Hashear


//     // const respuesta=req.body
//     // console.log(req.body);
//     if (existeUsuario) {
//         const error=new Error('usuario ya registrado')
//         return res.status(400).json({msg:error.message})
//     }
//     try {
//         const usuario = new Usuario(req.body)//crear unn usuario con la informacion}
//         usuario.token=generarId();//agrega el token
//         console.log(usuario);
//         const usuarioAlmacenado = await usuario.save()//guarda en mongo
//         res.json(usuarioAlmacenado)
        
//     } catch (error) {
//         console.log(error);
//     }
//     // res.json({msg:respuesta})
    
// }
// const autenticar=async(req,res)=>{
//     const {email,password}=req.body;
//     //comprobar si el usuario existe
//     const usuario=await Usuario.findOne({
//         email
//     })
//     // console.log(usuario);
//     if (!usuario) {
//         const error=new Error('El usuario no existe')
//         return res.status(404).json({msg:error.message})
//     }
    
//     //comprobar si el usuario esta confirmado
//     if (!usuario.confirmado) {
//         const error=new Error('Tu cuenta no ha sido confirmado')
//         return res.status(403).json({msg:error.message})
//     }
//     // console.log(usuario);
//     console.log(await usuario.comprobarPassword(password));
//     //comprobar su password
//     if (await usuario.comprobarPassword(password)) {
        
//         console.log('Es correcto');
//         // const error=new Error('Tu cuenta no ha sido confirmado')
//         return res.json({
//             _id:usuario._id,
//             nombre:usuario.nombre,
//             email:usuario.email
            
//         })
//         // return res.status(403).json({
//         //     _id:usuario._id,
//         //     nombre:usuario.nombre,
//         //     email:usuario.email
            
//         // })
//     }else{
//         // console.log('Es incorrecto');
//         const error=new Error('El password es  incorrecto')
//         return res.status(403).json({msg:error.message})
//     }

    
// }

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
  }




// //NOTE: Ejemplo 1.1
// // const usuarios=(req,res)=>{
// //     res.json({msg:'Desde API/usuarios'})
    
// // }

// // const crearUSuario=(req,res)=>{
// //     res.json({msg:'Creando usuario'})
    
// // }
// // export {
// //     usuarios,
// //     crearUSuario
// // }