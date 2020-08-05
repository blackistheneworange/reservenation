const router=require('express').Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const db=require('../database')

const secret=process.env.ACCESS_TOKEN_SECRET || '1234';

router.post('/login',async (req,res)=>{

	const {email,password}=req.body;
	

	const user=await db.find.findOne('users',email,'email')
	if(!user){
		return res.status(403).send("No Such User Exists")
	}

	const salt=bcrypt.genSaltSync(10)

	const hash=bcrypt.compareSync(password,user.password)
	
	if(!hash){
		return res.status(403).send("Password Wrong")
	}

	const token=jwt.sign({name:user.name,email:user.email},secret)
	const options={
		expires:new Date(Date.now()+60*24*24*365*200),
		httpOnly:true
	}
	res.cookie('reserve-nation',token,options)
	
	res.send("Success")
})


router.post('/register',async (req,res)=>{
        
	
	const {name,email,password}=req.body;

	const user=await db.find.findOne('users',email,'email')
	if(user){
		return res.status(403).send("Email Is Already Registered")
	}

	const salt=bcrypt.genSaltSync(10)
	hashPassword=bcrypt.hashSync(password,salt)

	await db.insert.insertOne('users',{name:name,email:email,password:hashPassword})

	res.send("Success")
})

router.post('/logout',async (req,res)=>{

	res.cookie('reserve-nation','',{expires:new Date(Date.now())})
	
	res.status(200).send()

})

module.exports=router;


