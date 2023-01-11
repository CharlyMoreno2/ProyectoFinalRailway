const passport = require('passport');
// const { users } = require('../usuarios/user');
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const daoMongoDb = require('../daos/users.mongodb');
const usersMongo = new daoMongoDb();

function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
    }
    
    
    function isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    
    
    const initPassport = () => {
        passport.use('login', new LocalStrategy( {passReqToCallback: true}, async (req,username, password, done) => {
            // console.log('login', users)
            // // if (err)
            // //   return done(err);

            let user = await usersMongo.getByUsername(username);
    
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false,req.flash('signinMessage','No existe un usuario con ese username'));
            }        
    
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false,req.flash('signinMessage','Contraseña incorrecta.'));
            }
    
            return done(null,user)
        })
    
    )

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            let user = await usersMongo.getByUsername(username)
            if (user) {
                console.log('Ya existe un usuario con ese nombre')
                return done(null, false, req.flash('signupMessage','Ya existe un usuario con ese nombre'))
            }
            
            let fotoPerfil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            if(req.body.fotoPerfil) fotoPerfil = req.body.fotoPerfil

            if(!req.body.nombre){
                console.log('Debe ingresar todos los campos')
                return done(null, false, req.flash('signupMessage','Debe ingresar todos los campos'))
            }
            
            if(req.body.password != req.body.repeatPassword){
                console.log('No coinciden las contraseñas')
                return done(null, false, req.flash('signupMessage','No coinciden las contraseñas'))
            }
            
            const usuarioGuardado = await usersMongo.save({
                nombre: req.body.nombre,
                username:req.body.username,
                password:createHash(req.body.password),
                email:req.body.email,
                numTelefono: req.body.code + req.body.numeroTel,
                direccion:  req.body.direccion,
                pais: req.body.pais,
                fotoPerfil: fotoPerfil,
                admin:false
            })
            console.log('Registrado')
            return done(null, usuarioGuardado)        
        })    
    )
    
    // nos guarda el id del usuario en la session
    passport.serializeUser((user, done) => { 
        // console.log(user)
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => { // toma el id que esta en las sessiones 
        let user = usersMongo.getById(id)
        done(null, user)
    })

}

module.exports = { initPassport }