const express=require('express')
const fs=require('fs')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const mainRouter=require('./routes/mainRouter')

const app=express()
const port=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}),bodyParser.json())
app.use(cookieParser())
app.use(cors({origin: true, credentials: true}));

app.use('/',mainRouter)

app.listen(port,()=>{
  console.log(`Listening on Port ${port}`)
})
