import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import mongoose from  "mongoose"
import morgan from "morgan"
import authRoutes from './routes/authRoutes.js'
dotenv.config()

const source=process.env.MONGOURI
const app = express()


app.use(function (res,req,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PATCH,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next()
})
app.use(morgan('dev'));
app.use(express.json({limit:'100mb',extended:true}))
app.use(express.urlencoded({limit:'100mb',extended:true}))
const PORT=process.env.PORT || 3500

app.use('/auth',authRoutes)

mongoose.set('strictQuery',true)

mongoose.connect(source).then(()=>{
    app.listen(()=>console.log('listening at port 5000'))
}).catch((err)=>console.log(err.message))

const db=mongoose.connection
db.on('error',(err)=>console.log('err,message'))
db.once('open',()=>{console.log( 'connection to mongodb established')})