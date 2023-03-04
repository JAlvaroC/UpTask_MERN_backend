import  jwt  from "jsonwebtoken";

import Usuario from '../models/Usuario.js';
// midleware =>Software intermedio


 const checkAuth = async(req,res,next) => { // next para saber cual es el siguiennte middleware
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        try {
            token=req.headers.authorization.split(" ")[1];
            // console.log(token);
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            req.usuario=await Usuario.findById(decoded.id ).select(
                "-password -confirmado -token -createdAt -updatedAt -__v")//sacar el password de la connsuklta

            return next();
        } catch (error) {
            return res.status(404).json({msg:`Hubo un Error`})
        }
       }
       if (!token) {
            const error = new Error("Token no válido")
            return   res.status(401).json({msg:error.message})
       }
    next()
}

export default checkAuth