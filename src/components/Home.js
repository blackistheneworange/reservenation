import React,{useState,useEffect} from 'react';
import axios from 'axios';

import Dashboard from './Dashboard';
import Landing from './Landing';

function Home(props){
	const [authenticated,setAuthenticated]=useState(false)
	const [name,setName]=useState("")

	useEffect(()=>{
		
		axios.get('/user')
		.then(res=>{
			if(res.data){
				setName(res.data.name)
				setAuthenticated(true)
			}
		})
		.catch(err=>{//none
		})
	})


	if(authenticated){
		return(<Dashboard name={name} setAuthenticatedStatus={props.setAuthenticatedStatus}/>)
	}
	else{
		return(<Landing/>)
	}
	
}

export default Home;
