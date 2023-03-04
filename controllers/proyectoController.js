
import Proyecto from '../models/Proyecto.js'
import Usuario from '../models/Usuario.js'

const obtenerProyectos = async(req,res) => { 
  const proyectos = await Proyecto.find({
    $or:[
      {colaboradores:{$in:req.usuario}},
      {creador:{$in:req.usuario}}
    // '$or':[
    //   {'colaboradores':{$in:req.usuario}},
    //   {'creador':{$in:req.usuario}}
    ]
  })
  .select("-tareas")
  // .where('creador')
  // .equals(req.usuario)
  
  res.json(proyectos)

 }
 
const nuevoProyecto = async(req,res) => { 
    // console.log(req.body);
    // console.log(req.usuario);
    const proyecto = new Proyecto(req.body) 
    proyecto.creador=req.usuario._id
    // console.log("🚀 ~ file: proyectoController.js:10 ~ nuevoProyecto ~ proyecto:", proyecto)
    try {
      const proyectoAlmacenado=await proyecto.save();
      res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error);
    }
    
 }
const obtenerProyecto = async(req,res) => { 
  // const {id}=req.params
  // // console.log(id);
  // const valid=mongoose.Types.ObjectId.isValid(id)
  // console.log("🚀 ~ file: proyectoController.js:29 ~ obtenerProyecto ~ valid:", valid)
  // // console.log(proyecto);
  // // NOTE: este if !proyecto no reconoce por eso crearemos un
  // if (!valid) {
  //   const error=new Error('PROYECTO No ennconntrado con valid')
  //   return res.status(404).json({msg:error.message})
  // }
  // const proyecto=await Proyecto.findById(id);
  // console.log("🚀 ~ file: proyectoController.js:28 ~ obtenerProyecto ~ proyecto:", proyecto)
  // if (!proyecto) {
  //   const error=new Error('No encontrado')
  //   return res.status(404).json({msg:error.message})
  //   // return res.status(404).json({msg:'No encontrado'})
  // }
  // if (proyecto.creador.toString()!==req.usuario._id.toString()) {
  //     // return res.status(401).json({msg:'Accion no Valida'})
  //     const error=new Error('Accion No Valida')
  //     return res.status(401).json({msg:error.message})
  // }
  // console.log(typeof proyecto.creador);
  // console.log(typeof req.usuario._id);
  
  // res.json(proyecto)
  // NOTE:  Solucion
  // const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    // console.log('llego',id);
   
    try {
      const proyecto = await Proyecto.findById(id)
      .populate({
        path:'tareas',
        populate:{path:'completado',select:"nombre"}}
        )
      .populate('colaboradores',"nombre email")
      // .select('-password');
      // console.log("🚀 ~ file: proyectoController.js:65 ~ //obtenerProyecto ~ proyecto:", proyecto)
      // console.log('aca', proyecto);
      if(!proyecto) {
        const error=new Error("No Encontrado")
        return res.status(404).json({msg:error.message}); 
      };
      
      if(proyecto.creador.toString() !== req.usuario._id.toString()
        && !proyecto.colaboradores.some(
          (colaborador)=>colaborador._id.toString() === req.usuario._id.toString())
      ){
        const error=new Error("Accion No Valida")
        res.status(401).json({msg: error.message});
      };
      //Obtener las tareas del Proyecto
      //NOTE:  y comentado  porque no es necesario  
      // const tareas=await Tarea.find().where('proyecto').equals(proyecto._id)

      // res.json(tareas);
      // proyecto.tareas=tareas
      // const respuesta={...proyecto,...tareas}
      // res.json(proyecto);
      // res.json(respuesta);
      // res.json({
      //   proyecto
      //   // , tareas
      // });
      res.json(proyecto);
        // , tareas
      // res.json({
      //   proyecto,
      //   tareas
      // });
    } catch (error) {
      res.status(404).json({msg: 'El id que ingresaste no  es valido'});
    };
  // };
 }
const editarProyecto = async(req,res) => { 
  const { id } = req.params;
   
  try {
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {
      const error=new Error("No encontrado")
      res.status(404).json({msg: error.message}); 
    };
    
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error=new Error("Accion No Válida")
      res.status(401).json({msg:error.message});
    };
    // res.json(proyecto);
    proyecto.nombre=req.body.nombre|| proyecto.nombre;
    proyecto.descripcion=req.body.descripcion|| proyecto.descripcion;
    proyecto.fechaEntrega=req.body.fechaEntrega|| proyecto.fechaEntrega;
    proyecto.cliente=req.body.cliente|| proyecto.cliente;
    
      try {
        const proyectoAlmacenado=await proyecto.save()
        res.json(proyectoAlmacenado)

      } catch (error) {
        console.log(error);
      }


  } catch (error) {
    res.status(404).json({msg: 'El id que ingresaste no es valido'});
  };
    
 }
const eliminarProyecto = async(req,res) => { 
  const { id } = req.params;
   
  try {
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {
      const error=new Error('No encontrado')
      res.status(404).json({msg: error.message}); 
    };
    
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error=new Error('No encontrado')
      res.status(401).json({msg: error.message});
    };
    // // res.json(proyecto);
    // proyecto.nombre=req.body.nombre|| proyecto.nombre;
    // proyecto.descripcion=req.body.descripcion|| proyecto.descripcion;
    // proyecto.fechaEntrega=req.body.fechaEntrega|| proyecto.fechaEntrega;
    // proyecto.cliente=req.body.cliente|| proyecto.cliente;
      try {
        // const proyectoAlmacenado=
        await proyecto.deleteOne();
        
        res.json({msg:"Proyecto Eliminado"});

      } catch (error) {
        console.log(error);
      }

  } catch (error) {
    res.status(404).json({msg: 'El id que ingresaste no es valido'});
  };  
 }

 const buscarColaborador = async(req,res) => { 
  // console.log(req.body);
  const {email}=req.body
  try {
    const usuario=await Usuario.findOne({email}).select("-confirmado -createdAt -password -token -updatedAt -__v")
    
      if (!usuario) {
        const error=new Error("Usuario No encontrado")
        return  res.status(404).json({msg: error.message});
      }
      res.json(usuario)
    
  } catch (error) {
    console.log(error);
  }
 }
 
const agregarColaborador = async(req,res) => { 
  // console.log('id agregar colaborador',req.params.id);

  try {
      const proyecto= await Proyecto.findById(req.params.id);

    if (!proyecto) {
      // console.log("🚀 ~ file: proyectoController.js:196 ~ agregarColaborador ~ proyecto:", proyecto)
      const error= new Error("Proyecto No encontrado")
      return res.status(404).json({msg:error.message})
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error= new Error("Accion no válida")
      return res.status(404).json({msg: error.message});
    }

    // console.log(req.body);
    const {email}=req.body;
    const usuario=await Usuario.findOne({email}).select("-confirmado -createdAt -password -token -updatedAt -__v")
    // console.log("🚀 ~ file: proyectoController.js:208 ~ agregarColaborador ~ usuario:", usuario)

    if (!usuario) {
      const error = new Error("Usuario No encontrado")
      return res.status(404).json({msg: error.message});
    }
    // El colaborador no es el admin del proyecto
    if (proyecto.creador.toString() === usuario._id.toString()) {
      const error=new Error("El creador del Proyecyo no puede ser colaborador")
      return res.status(404).json({msg: error.message});
    }
      // Revisar que no este ya agregado al proyecto
    if (proyecto.colaboradores.includes(usuario._id)) {
      const error=new Error("El usuario ya pertenece al proyecto")
      return res.status(404).json({msg: error.message});
    }
    // Esta bienn , se puede agregar 
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    res.json({msg:'Colaborador Agregado Correctamente'})
  
  } catch (error) {
    res.status(404).json({msg: 'El id que ingresaste no es valido <agregarColaborador/>'});
  }
}
  

const eliminarColaborador = async(req,res) => { 

  try {
    const proyecto = await Proyecto.findById(req.params.id);
  
    if (!proyecto) {
      const error = new Error("Proyecto No Encontrado");
      return res.status(404).json({ msg: error.message });
    }
  
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(404).json({ msg: error.message });
    }
  
    // Esta bien, se puede eliminar
    proyecto.colaboradores.pull(req.body.id);
    await proyecto.save();
    res.json({ msg: "Colaborador Eliminado Correctamente" });
  } catch (error) {
    
    res.status(404).json({msg: 'El id que ingresaste no es valido <eliminarColaborador/>'});
  }

 }

// NOTE: esto ya se realizo en la funcionn de obtener proyecto una sola llamada
// const obtenerTareas = async(req,res) => { 
//   const {id}=req.params;
//   const existeProyecto=await Proyecto.findById(id)
//   if(!existeProyecto){
//     const error=new Error('No encontrado');
//     return res.status(404).json({msg:error.message});
//   }
//   // Tienes que ser el creado del proyecto
//   const tareas=await Tarea.find().where('proyecto').equals(id)

//   res.json(tareas);
//  }

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador
  // ,  obtenerTareas
}
