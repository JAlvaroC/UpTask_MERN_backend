// import express from 'express'
// import dotenv from "dotenv"
// import cors from 'cors'
// import conectarDB from './config/db.js';
// import usuarioRoutes from './routes/usuarioRoutes.js';
// import proyectoRoutes from './routes/proyectoRoutes.js';
// import tareaRoutes from './routes/tareaRoutes.js';

// // var cors = require('cors');
// const app = express();
// app.use(express.json())//procesa la informacion tipo json en consola

// dotenv.config();
// conectarDB()


// // const whiteList =[process.env.FRONTEND_URL,'http://127.0.0.1:5173']

// // const corsOptions={
// //     origin: function(origin,callback){
// //         if (whiteList.includes(origin)) {
// //             //Tiene permiso para consultar la api
// //             callback(null,true)
// //         }else{
// //             // No esta permitido 
// //             callback(new Error("Error de Cors"))
// //         }
// //     }
    
// // }

//     // app.use(cors(corsOptions))
//     app.use(cors());
//     app.use(function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         next();
//      });

//     // Routing 
//     app.use('/api/usuarios',usuarioRoutes)
//     app.use('/api/proyectos',proyectoRoutes)
//     app.use('/api/tareas',tareaRoutes)
//                 // app.use('/api/proyectos',usuarioRoutes)
//     const PORT= process.env.PORT || 4000;
//     const servidor = app.listen(PORT,() => { 
//         console.log(`Servidor corriendo en el puerto http://localhost:${PORT} || http://127.0.0.1:${PORT}`);
//     })
//     // console.log('Servidor corriendo en el puerto 4000');

//     // SocketIO
//     import  {Server}  from "socket.io";

//     const io = new Server(servidor,{
//     pingTimeout:60000,
//     cors:{
//         // origin:process.env.FRONTEND_URL,
//         origin:'*',
//     }
//     })

//     io.on("connection",(socket) => { 
//     console.log("Conectado a socket.io");
    
//     // Definnir los eventos de socket io
//     socket.on("abrir proyecto",(proyecto) => {
//         socket.join(proyecto)
//     })

//     socket.on("nueva tarea",(tarea) => {
//         const proyecto = tarea.proyecto
//         socket.to(proyecto).emit("tarea agregada",tarea)
//     })

//     socket.on("eliminar tarea",(tarea)=>{
//         const proyecto = tarea.proyecto
//         socket.to(proyecto).emit("tarea eliminada",tarea)
//     })

//     socket.on("actualizar tarea",(tarea)=>{
//         const proyecto = tarea.proyecto._id
//         socket.to(proyecto).emit("tarea actualizada",tarea)
//     })

//     socket.on("actualizar estado",(tarea)=>{
//         const proyecto = tarea.proyecto._id
//         socket.to(proyecto).emit("nuevo estado",tarea)
//     })
//  })

// // Socket IO


// //definir los eventos de socket io
import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';


// como es archivo que cree necesita la extension .js diferente a una depenndencia
// import prueba from './prueba';
// import prueba from './prueba.js';
const app = express();
app.use(express.json())//procesa la informacion tipo json en consola

dotenv.config();
conectarDB()

// console.log(process.env.MONGO_URI);
// console.log('desde index.js');
//Configurar CORS

// const whiteList =['http://127.0.0.1:5173']
const whiteList =[process.env.FRONTEND_URL,'http://127.0.0.1:5173']

const corsOptions={
    origin: function(origin,callback){
        if (whiteList.includes(origin)) {
            //Tiene permiso para consultar la api
            callback(null,true)
        }else{
            // No esta permitido 
            callback(new Error("Error de Cors"))
        }
    }
    
}
// app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   });
    
    // app.use(cors(corsOptions))
    // Routing http://localhost:3000
    // NOVEDAD: DEJARA DE APARECER CANNOT GET 
    // app.<[get,post,delete,put]> => app.<use> responde a cualquier metodo
    // app.use('/',(req,res)=>{
        //     res.json({msg:'OK'})
        // })
        // app.get('/',(req,res)=>{
            //     // response=> respuesta que recibes
            //     // request => es el pedido que haces
            //     res.send('Hola mundo')
            // })
            // app.use('/api/usuarios',(req,res)=>{
                //     res.json({msg:'OK'})
                // })
    app.use(cors(corsOptions))

    // Routing 
    app.use('/api/usuarios',usuarioRoutes)
    app.use('/api/proyectos',proyectoRoutes)
    app.use('/api/tareas',tareaRoutes)
                // app.use('/api/proyectos',usuarioRoutes)
    const PORT= process.env.PORT || 4000;
    const servidor = app.listen(PORT,() => { 
        console.log(`Servidor corriendo en el puerto http://localhost:${PORT} || http://127.0.0.1:${PORT}`);
    })
    // console.log('Servidor corriendo en el puerto 4000');

    // SocketIO
    import  {Server}  from "socket.io";

    const io = new Server(servidor,{
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL,
        // origin:'*',
        // origin:'http://127.0.0.1:5173',
    }
    })
    // origin:'http://127.0.0.1:5173/',
    // console.log('llego');
    // socket.on('prueba',(proyectos)=>{
        //     console.log('Prueba desde Socket io ' ,proyectos);
        //     socket.emit('respuesta',{
            //         nombre:'Juan'
            //     })
            //     // socket.on()
            // })
            // socket.to("3fcde3cda71521c30e0263e").emit("respuesta",{nombre:'Juan'})
            // console.log("Desde el proyecto",proyecto);
    io.on("connection",(socket) => { 
    console.log("Conectado a socket.io");
    
    // Definnir los eventos de socket io
    socket.on("abrir proyecto",(proyecto) => {
        socket.join(proyecto)
    })

    socket.on("nueva tarea",(tarea) => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit("tarea agregada",tarea)
    })

    socket.on("eliminar tarea",(tarea)=>{
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit("tarea eliminada",tarea)
    })

    socket.on("actualizar tarea",(tarea)=>{
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit("tarea actualizada",tarea)
    })

    socket.on("actualizar estado",(tarea)=>{
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit("nuevo estado",tarea)
    })
 })

// Socket IO


//definir los eventos de socket io