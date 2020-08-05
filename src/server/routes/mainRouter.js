const router=require('express').Router()
const jwt=require('jsonwebtoken')

const userRouter=require('./userRouter')
const auth=require('./authRouter')
const db=require('../database')

const secret=process.env.ACCESS_TOKEN_SECRET || '1234'

const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

router.use(auth.attachUser)

router.route('/reserve')
.get(async (req,res)=>{
	
	if(!req.user){
		return res.status(403).send()
	}

	const reservation=await db.find.findOne('reservations',req.user,'email')
	if(!reservation){
		return res.send("Not Found")
	}

	const date=reservation.date.split(" ")
	const year=parseInt(date[3])
	const month=date[2]
	const day=parseInt(date[1])

	if(new Date().getFullYear()>year || new Date().getMonth()>months.indexOf(month) || new Date().getDate()>day){
		
		await db.delete.deleteOne('reservations',req.user,'email')
		return res.send("Not Found")
	}
	res.send(reservation)
	
})

.post(async (req,res)=>{

	if(!req.user){
		return res.status(403).send()
	}
	const preCheck=await db.find.findOne('reservations',req.user,'email')
	if(preCheck){
		
		return res.status(403).send()
	}

	req.body.email=req.user;
	await db.insert.insertOne('reservations',req.body)
	res.send('Success')
})

.put(async (req,res)=>{

	if(!req.user){
		return res.status(403).send()
	}

	await db.update.updateOne('reservations',req.user,req.body,'email')

	
	res.send()
})

.delete(async (req,res)=>{

	if(!req.user){
		return res.status(403).send()
	}

	const reservation=await db.find.findOne('reservations',req.user,'email')
	if(!reservation){
		return res.status(403).send()
	}

	await db.delete.deleteOne('reservations',req.user,'email')
	res.send()

})

router.get('/user',async (req,res)=>{

	const token=req.cookies['reserve-nation']
	
	
	if(!token){
		return res.status(403).send()
	}
	jwt.verify(token,secret,(err,user)=>{
		if(err){
			return res.status(403).send()
		}
		
		res.status(200).send({name:user.name})
	})
})


router.use(userRouter)


module.exports=router;
