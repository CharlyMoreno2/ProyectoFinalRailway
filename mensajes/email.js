const { createTransport } = require("nodemailer")
require('dotenv').config()

const transporter = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:process.env.EMAIL_ADMIN,
        pass:process.env.PASS_EMAIL_ADMIN
    }
});

// const mailOptions = {
//     from:'Servidor Node JS',
//     to: 'charlybackend2023@gmail.com',
//     subject:'Mail de prueba desde Node JS',
//     html:'<h1>HOLA SOY UN MAIL</h1>'
// }

async function sendEmail(mailOptions){
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
        return info;
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {sendEmail}
