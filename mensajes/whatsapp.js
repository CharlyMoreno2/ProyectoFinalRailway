//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../loggers/log4js.loggers')

const twilio = require('twilio')
require('dotenv').config()

const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_TOKEN = process.env.TWILIO_TOKEN


const cliente = twilio(TWILIO_SID, TWILIO_TOKEN)

async function sendWhatsapp(mensaje){
    try {
        
        const options = {
            body: mensaje,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.TWILIO_TEL}`
           
        }
        const message = await cliente.messages.create(options)
        logger.info(message)        
    }catch(err) {
        logger.error(err)
    }
}

module.exports = {sendWhatsapp}
