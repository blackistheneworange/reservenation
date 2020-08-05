const express=require('express')
const fs=require('fs')
const path=require('path')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const mainRouter=require('./routes/mainRouter')

const app=express()
const port=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}),bodyParser.json())
app.use(cookieParser())
//app.use(cors({origin: true, credentials: true}));

app.use(express.static(path.resolve('dist')));

app.use('/',mainRouter)

app.get('*',(req,res)=>{

	res.sendFile(path.resolve('dist/index.html'))
})

app.listen(port,()=>{
  console.log(`Listening on Port ${port}`)
})
