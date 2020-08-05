import React,{useState,useEffect} from 'react';    
import {useHistory,withRouter,Link} from 'react-router-dom'
import axios from 'axios';


function Login(props){

        const history=useHistory()

	const [credentials,setCredentials]=useState({
		email:"",
		password:""
	})
	const [error,setError]=useState(null)
	const [success,setSuccess]=useState(null)
	const [loading,setLoading]=useState(false)

	useEffect(()=>{
		
		if(props.location && props.location.customNameData){
			setSuccess(props.location.customNameData)
		}
	},[])
	
        
	function handleChange(e){
		setCredentials({...credentials,[e.target.name]:e.target.value})
	}

	function handleLogin(e){
		e.preventDefault()

		setSuccess(null)

		if(credentials.email==="" || credentials.password===""){
			setError("Both Fields Required")
			return
		}
		setError(null)

		setLoading(true)
	
		axios.post('/login',{email:credentials.email,password:credentials.password})
		.then(res=>{
		
			if(res.data==="Success"){
				props.setAuthenticatedStatus()
		        	history.push('/')
			}
			else{
				setError("Login Failed")
			}
		})
		.catch(err=>{
		
			setError(err.response.data)
		})
		.finally(e=>{
			
			setLoading(false)
		})
	}

        return(
	      <div className='row' style={{marginTop:'10vh'}}>
		<div className='col s12 m6 offset-m3 l4 offset-l4'>
                <Link to="/">Go To Home</Link>
		<h3>Login Now</h3>

		{success?
			<div className='col s12 green lighten-2 white-text' style={{padding:'16px'}}>{success}</div>
			
		:''}

		<form onSubmit={handleLogin}>

		<div className='row'>

		 <div className='input-field col s12'>
		  <input id='email' name="email" type="email" onChange={handleChange}/>
		  <label htmlFor='email'>Email</label>
		 </div>

		 <div className='input-field col s12'>
		  <input id='password'  name="password" type="password" onChange={handleChange}/>
		  <label htmlFor='password'>Password</label>
		 </div>

		{error?
		 <div className='col s12'>
		  <div className='red lighten-2 white-text error'>{error}</div>
		 </div>
		:''}

		 <div className='col s12'>
		  <button type="submit" className='btn light-blue waves-effect'>{loading?<span className='spinner'></span>:<span>Login</span>}</button>
		 </div>
		 <div className='col s12' style={{marginTop:'10px'}}>
		   <span>Don't have an account? Create one <Link to="/register">here</Link></span>
		 </div>
		 
		</div>
		</form>
		</div>
	      </div>
        )
}

export default withRouter(Login)
