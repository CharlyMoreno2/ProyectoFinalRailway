const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const handlebars = require('express-handlebars')
const flash = require('connect-flash');

const PORT = process.env.PORT || 8080
const mode = process.argv[3]
const numCPUs = require('os').cpus().length

const { authRouter } = require('./routes/auth.routes.js')
const { authMiddleware } = require('./middlewares/auth.middleware')

//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('./loggers/log4js.loggers')
const { loggerMiddleware } = require('./middlewares/logger.middleware')
//_____________________________________________ mongo para session _____________________________________ //
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
//____________________________________________________________________________________________________ //
const passport = require('passport')
const { initPassport } = require('./middlewares/passport.js')
//____________________________________________________________________________________________________ //

const apiProductosRouter = require('./routes/api.productos.routes')
const { productosRouter } = require('./routes/productos.routes.js')
const { carritoRouter } = require('./routes/carrito.routes.js')

const { getCurrentUser } = require('./middlewares/currentUser')

const app = express()

 /////////////////////// configuracion de handlebars /////////////////////////
 app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        allowProtoMethodsByDefault:true
    })
)
app.set("view engine", "hbs")
app.set("views", "./views")
app.use(flash())

//////////////  middleware  ///////////////////////
app.use(session({
    secret: process.env.SECRET,    
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: advancedOptions,
    }),
    resave: true, 
    saveUninitialized: true,
    cookie:{
        maxAge:60 * 1000
    }
}))

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    next();
  });

app.use(cookieParser(process.env.SECRET))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggerMiddleware)

app.use('/api/auth', authRouter)
app.use('/api/productos', apiProductosRouter)
app.use('/productos', productosRouter)
app.use('/carrito', carritoRouter)

app.get('/', authMiddleware,async(req, res) => {
    const user = await getCurrentUser(req.user);
    res.render('principal',{user:user})
})

app.get('/privado', authMiddleware, async (req, res) => {
    res.send('Contenido Privado')
})

if(mode === 'cluster'){
    if (cluster.isPrimary) {
        logger.info(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died`)
        })
    } else {
        
        const server = app.listen(PORT,()=>{
            logger.info(`Listening on port ${PORT}`)
        })
        
        server.on("error",err=>logger.error(err));
        
        logger.info(`Worker ${process.pid} started`)
    }
}
else{
    const server = app.listen(PORT,()=>{
        logger.info(`Listening on port ${PORT}`)
    })
    
    server.on("error",err=>logger.error(err));
}

