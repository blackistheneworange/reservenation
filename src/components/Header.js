import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function Header(props){

	const history=useHistory()

	function handleLogout(){

		axios.post('/logout',{})
		.then(res=>{
			props.setAuthenticatedStatus()
			history.push({
				pathname:'/login',
				customNameData:'Logged Out Successfully'
			})
		})
	}


	return(
		<div className='row blue darken-1 white-text' style={{marginBottom:'0px'}}>
		<div className='col s12'>
		<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
		<h4><b>Reserve Nation</b></h4>

		{props.authenticated?
		<button style={{marginTop:'16px'}} className='white-text btn-small btn-flat' onClick={handleLogout}>Logout</button>
		:''}
		</div>
		</div>
		</div>
	)
}
