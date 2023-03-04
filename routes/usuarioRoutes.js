import express from "express";
const router = express.Router();
import {
  autenticar,
  confirmar,
  olvidePassword,
  registrar,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar); //crea un nuevo usuario
router.post("/login", autenticar); //
router.get("/confirmar/:token", confirmar); //: permite generar routing dinamico
router.post("/olvide-password", olvidePassword); //: permite generar routing dinamico
// router.get('/olvide-password/:token',comprobarToken)//: permite validar el usuario con el token
// router.post('/olvide-password/:token',nuevoPassword)//: permite generar routing dinamico

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil); //accder a la funccion de perfil

//NOTE:ejemplos 1.1
// router.get("/",usuarios)
// router.post("/",crearUSuario)

//NOTE:ejemplos
// router.get('/',(req,res)=>{
//     res.json('Desde api/usuarios')
// })
// router.get('/confirmar',(req,res)=>{
//     res.json({msg:'CONFIRMAR USUARIO'})
// })
// router.post('/',(req,res)=>{
//     // cuando rtiennes un formulario puedes probar esto o con postman
//     // GET POST  son los unicos soportados en el navegador a difernencia de DELETE ....
//     res.json('Desde -POST- api/usuarios')
// })
// router.put('/',(re,res)=>{
//     res.json('Desde -PUT- api/usuarios')
// })
// router.delete('/',(re,res)=>{
//     res.json('Desde -DELETE- api/usuarios')
// })
export default router;
