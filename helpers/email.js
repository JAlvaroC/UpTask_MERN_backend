
import nodemailer from 'nodemailer';

export  const emailRegistro = async(datos) => { 
  const {email,nombre,token}=datos;

     // TODO: MOVER hacia variables de entorno
    const  transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Informacion del email
      const info = await transport.sendMail({
        from:'Uptask - Adminnistrador de Proyectos <cuentas@uptask.com>',
        to:email,
        subject:'Uptask - Comprueba tu cuenta',
        text:'Comprueba tu cuenta en Uptask',
        html:`
        <p>
        Hola: ${nombre} Comprueba tu cuenta en Uptask</p>
        <p >Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiennte enlace : </p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `


      })

  }

  export  const emailOlvidePassword = async(datos) => { 
    const {email,nombre,token}=datos;
    
      // TODO: MOVER hacia variables de entorno
      const  transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
        // Informacion del email

        const info = await transport.sendMail({
          from:'Uptask - Adminnistrador de Proyectos <cuentas@uptask.com>',
          to:email,
          subject:'Uptask - Reestablece tu password',
          text:'Reestablece tu password',
          html:`
          <p>
          Hola: ${nombre} ha solcitado reestablecer tu password</p>
          <p >sigue el siguiete enlace para generar un nuevo password : </p>
          <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablcer Password</a>
          
          <p>Si tu no solicitaste est email, puedes ignorar el mensaje</p>
          `
  
  
        })
  
    }
