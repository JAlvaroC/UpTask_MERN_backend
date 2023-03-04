
import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js'

const agregarTarea= async(req,res) => { 
    const {proyecto}= req.body;
    try {
        const existeProyecto=await Proyecto.findById(proyecto)
    
        if(!existeProyecto   ) {
            const error= new Error("El proyecto no existe");
            return res.status(404).json({msg:error.message })
        }
    
        if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
            const error=new Error('No tienes los permisos para añadir tareas');
            return res.status(403).json({msg:error.message })
        }
        try {
            const tareaAlmacenada=await Tarea.create(req.body)
            // Almacenar el Id en el proyecto
            existeProyecto.tareas.push(tareaAlmacenada._id)
            await existeProyecto.save();
            res.json(tareaAlmacenada)
    
        }catch(error){
            console.log(error);
        }
        
    } catch (error) {
        return res.status(404).json({msg:"Id no valido"})
    }
 }
// const agregarTarea = async (req, res) => {
//     const { proyecto } = req.body;
  
//     const existeProyecto = await Proyecto.findById(proyecto);
  
//     if (!existeProyecto) {
//       const error = new Error("El Proyecto no existe");
//       return res.status(404).json({ msg: error.message });
//     }
  
//     if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
//       const error = new Error("No tienes los permisos para añadir tareas");
//       return res.status(403).json({ msg: error.message });
//     }
  
//     try {
//       const tareaAlmacenada = await Tarea.create(req.body);
//       // Almacenar el ID en el proyecto
//       existeProyecto.tareas.push(tareaAlmacenada._id);
//       await existeProyecto.save();
//       res.json(tareaAlmacenada);
//     } catch (error) {
//       console.log(error);
//     }
//   };

const obtenerTarea= async(req,res) => { 
    const {id}=req.params;
    //NOTE: El siguiete codifgo comentado cumple la misma fucion que el popúlate
    try {
        const tarea=await Tarea.findById(id).populate("proyecto")//populate accede en el objeto

        if (!tarea) {
            const error=new Error("Tarea no encontrada")
            return res.status(404).json({msg:error.message})
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error=new Error("Accion no Valida")
            return res.status(403).json({msg:error.message})
        }
        res.json(tarea)
        
    } catch (error) {
   
        return res.status(404).json({msg:"Id no valido"})
    }
 }

const actualizarTarea= async(req,res) => { 
    const {id}=req.params
    try {
        const tarea=await Tarea.findById(id).populate("proyecto")//populate accede en el objeto
        if (!tarea) {
            const error=new Error("Tarea no encontrada")
            return res.status(404).json({msg:error.message})
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error=new Error("Accion no Válida")
            return res.status(403).json({msg:error.message})
        }

        tarea.nombre = req.body.nombre || tarea.nombre
        tarea.descripcion = req.body.descripcion || tarea.descripcion
        tarea.prioridad = req.body.prioridad || tarea.prioridad
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega
        try {
            const tareaAlmacenada=await tarea.save()
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error);
        }
        
    } catch (error) {
   
        return res.status(404).json({msg:"Id no valido"})
    }
 }
const eliminarTarea= async(req,res) => { 
    const {id}=req.params
    try {
        const tarea=await Tarea.findById(id).populate("proyecto")//populate accede en el objeto
        if (!tarea) {
            const error = new Error("Tarea no encontrada")
            return res.status(404).json({msg:error.message})
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Accion no Válida")
            return res.status(403).json({msg:error.message})
        }

        try {
            // const tareaAlmacenada=await tarea.save()
            // console.log(tareaAlmacenada);
            const proyecto=await Proyecto.findById(tarea.proyecto)
            proyecto.tareas.pull(tarea._id)

            await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()])
            // res.json(tareaAlmacenada)
            res.json({msg:'La Tarea se eliminó'})
        } catch (error) {
            console.log(error);
        }        
    } catch (error) {
   
        return res.status(404).json({msg:"Id no valido"})
    }
 }

const cambiarEstado= async(req,res) => { 
    const {id}=req.params

    try {
        //NOTE: Escribe asi e el video pero enn el repositorio cambio
        //populate accede en el objeto
        // const tarea=await Tarea.findById(id).populate("proyecto").populate('completado')
        const tarea=await Tarea.findById(id).populate("proyecto")

        if (!tarea) {
            const error = new Error("Tarea no encontrada")
            return res.status(404).json({msg:error.message})
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()
            && !tarea.proyecto.colaboradores.some(
            (colaborador)=>colaborador._id.toString() === req.usuario._id.toString())
        ) {
            const error=new Error("Accion no Válida")
            return res.status(403).json({msg:error.message})
        }
        tarea.estado = !tarea.estado;
        tarea.completado = req.usuario._id;
        await tarea.save()
        const tareaAlmacenada=await Tarea.findById(id)
            .populate("proyecto")
            .populate('completado')
        res.json(tareaAlmacenada);
        
    } catch (error) {
        return res.status(404).json({msg:"Id no valido"})
    }


 }

 


export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado
}
