const express       =   require('express')
const dotenv        =   require('dotenv')
const session       =   require('express-session')
const connection    =   require('./modal/connection')
const routes        =   require('./routes/router')
const cors          =   require('cors')



dotenv.config({ path: "config.env"})

const app = express()
const connectDB = connection()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret-value',
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes)

app.listen(process.env.PORT,() => {
    console.log("Listening At: http://localhost:"+process.env.PORT)
})