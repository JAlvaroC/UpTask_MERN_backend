# mongoDB
QuickStart
user:mern_user
password:fO5********TGS2WhydblVc8


# Conectar App a la basse de datos
+ npm i mongoose

+ npm i dotenv instala el archivo de variables de enntorno

# MVC (Model View Controller)
Patron de arquitectura de software 
+ permite separacion de oblicaciones de cada pieza de tu codigo
+ Ennfatiza la separacion de la logica de programacion con la presentacion


MVC arquitectura para web y se utiliza en cualquier lenguaje

**Ventaja:**

+ Mejor orden de codigo
+ se identifica un codigo especifico con su funcionalidad

# Que es modelo

Encargado de la base de datos y el CRUD
El modelo se encargara de consultar una base de datos pero no mostrar los datos

# Vista
Es todo lo lo que se ve en HTML
modelo consulta la base de datos pero es la **vista** el que muestar el resultado
React es la vista

# Controlador
Es el que comunica modelo y vista 
el conntrolador llama y comunica para que los muestre

# Router 
Registra todas las URL's o endpoints

A traves del router se tiene indicaciones de comunicarse con un controlador porque ya sabe el modelo
 y la vista que se ejecutara

![](./Imagenes/MVC%20%20funcionamiento.jpg)

# Hashear password
Es Encriptar  los datos en la base de datos
debido a que hay personas que utiliazr la clave  en mas sitios
+ npm i bcrypt
# JWT(JSONWEBTOKEN)
+ instalar dependencia : npm i jsonwebtoken

ctrl+alt + l para comentar clg linea

nfn
# CORS
permiso para comunicarte de una url a otra ejmplo (localhost:3000) a localhost:4000 (backend)
+ npm i cors
+ npm install nodemailer

+npm i socket.io

# Git Hub
UpTask_MERN_backend
+git init
+ git add .
+ git commit -m "first commit"
+ git branch -M main
+ git remote add origin https://github.com/JAlvaroC/UpTask_MERN_backend.git
+ git push -u origin main

para deploy de jwt eviroment
+ ejecutar opennssl
+ openssl rand -base64  32 (pegaremos remplazo de palabra secreta)
6xnqoVlsSIHAJFE2XGyUfTRSsra7j2lYpxHUz5SGRS0=

# No se  logro hacer funcionar en la web 
Link: uptaskmernbackend-production-c09d.up.railway.app

El backed lo asigna la misma 
pagina
