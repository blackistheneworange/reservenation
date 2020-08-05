import React,{useState,useEffect} from 'react';
import {useHistory,Link} from 'react-router-dom';
import axios from 'axios';


export default function Register(){

	const history=useHistory()

	const [credentials,setCredentials]=useState({
		name:"",
		email:"",
		password:"",
		password2:""
	})
	const [error,setError]=useState(null)
	const [loading,setLoading]=useState(false)


	function handleChange(e){
		setCredentials({...credentials,[e.target.name]:e.target.value})
	}

	function handleRegister(e){
		e.preventDefault()
		

		if(credentials.password!==credentials.password2){
			setError("Passwords Doesn't Match")
			
			return;
		}
		if(credentials.email==="" || credentials.name==="" || credentials.password===""){
			setError("All Fields Are Required")
			return;
		}
                
		setLoading(true)
		setError(null)

		axios.post('/register',credentials)
		.then(res=>{
			if(res.data==="Success"){
			  return history.push({
				  pathname:'/login',
				  customNameData:'Registered Successfully'
			  })
			}
			setError("Registration Failed")
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
		<h3>Create Your Account</h3>
		<form onSubmit={handleRegister}>
		 <div className='row'>

		 <div className='input-field col s12'>

                   <input id="name" name="name" type="text" onChange={handleChange}/>
		   <label htmlFor="name">Name</label>
		 </div>
		 
		 <div className='input-field col s12'>
                  <input id="email" name="email" type="email" onChange={handleChange}/>
		  <label htmlFor="email">Email</label>
		 </div>

		 <div className='input-field col s12'>
		  <input id="password" name="password" type="password" onChange={handleChange}/>
		  <label htmlFor="password">Password</label>
		 </div>

		 <div className='input-field col s12'>
		  <input id="password2" name="password2" type="password" onChange={handleChange}/>
		  <label htmlFor="password2">Re-enter Password</label>
		 </div>

		{error?
		  <div className='col s12'>
		  <div className='error red lighten-2 white-text'>{error}</div>
		  </div>
		:''}

		 <div className='col s12'>
		  <button type="submit" className='btn light-blue waves-effect'>{loading?<span className='spinner'></span>:<span>Register</span>}</button>
		 </div>

		 <div className='col s12' style={{marginTop:'16px'}}>
		  <span>Already have an account? <Link to='/login'>Login</Link></span>
		 </div>

		 </div>

                </form>
		</div>
	      </div>
        )
}

