import React from 'react';
import {useHistory,Link} from 'react-router-dom';

export default function Home(){

	const history=useHistory()



	return(
	     <div className='row blue lighten-1' style={{height:'100vh',display:'flex',alignItems:'center'}}>
		<div className='col s12 landing'>
		<h3 style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Reserve Your Seats Now</h3>
		<div className='buttons'>
		  <Link to="/login" className='btn light-blue'>Login</Link>
		  <Link to="/register" className='btn light-blue'>Register</Link>
		</div>
		</div>
	     </div>
	)
}
