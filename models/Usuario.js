// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt' 
// const usuarioSchema =mongoose.Schema({
//     // NOVEDAD:trim para que corte bien sin los espacion en blanco
//     nombre:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         unique:true
//     },
//     token:{
//         type:String,
//     },
//     confirmado:{
//         type:Boolean,
//         default:false
//     }
// },{
//     timestamps:true,
//     //NOVEDAD: Hora actual del documento creado
// }
// )
// usuarioSchema.pre('save',async function(next){
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt =await bcrypt.genSalt(10)//10 rondas 
//     this.password= await bcrypt.hash(this.password,salt)
//     // this.password=  bcrypt.hash(this.password,salt)
// });
// usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
//     return await bcrypt.compare(passwordFormulario,this.password)
// }

// const Usuario = mongoose.model("usuario",usuarioSchema)

// export default Usuario
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;