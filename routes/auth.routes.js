const { Router } = require('express')
const passport = require('passport')
const { authMiddleware } = require('../middlewares/auth.middleware')
// const { passport } = require('../middlewares/passport')

const PaisesDaoArchivo = require('../daos/paises.archivo')
const paisesDao = new PaisesDaoArchivo();

const authRouter = Router()


//____________________________________________ login _____________________________________ //
authRouter.get('/login', (req, res) => { // lleva la vista del formulario de login
    res.render('login')
})

authRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/api/auth/login',
}))

//____________________________________________ register _____________________________________ //

authRouter.get('/register', async (req, res) => {   // devuelve la vista de registro 
    const paises = await paisesDao.getAll();
    const error = null;
    res.render('register',{paises: paises,error:error})
})

authRouter.post('/register', passport.authenticate('signup', {
    successRedirect: '/api/auth/login',
    failureRedirect: '/api/auth/register',
}))
//____________________________________________ logout _____________________________________ //

authRouter.get('/logout', (req, res) => { // cierra la sesion
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.render('logout')
    })
})

authRouter.get('/prueba', authMiddleware ,(req, res) => { 
    res.send('Hola entre')
})


module.exports = { 
    authRouter 
}