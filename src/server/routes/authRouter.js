const jwt=require('jsonwebtoken')

const secret='1234'||process.env.ACCESS_TOKEN_SECRET;

exports.attachUser=(req,res,next)=>{
	const token=req.cookies['reserve-nation']

	
	
	if(!token){
		return next()
	}
	
	jwt.verify(token,secret,(err,user)=>{
		if(err){
			return next()
		}

		req.user=user.email
		next()
	})

}
