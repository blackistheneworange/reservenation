import React,{useState,useEffect} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound'

export default function App(){

	const [authenticated,setAuthenticated]=useState(false)
	const [name,setName]=useState("")
   
	useEffect(()=>{
		axios.get('/user')
		.then(res=>{
			if(res.data){
				
				setAuthenticated(true)
				setName(res.data.name)
			}
		})
		.catch(err=>{
			//err
		})

	},[])

	const RouteGuard=Component=>({match})=>{
		if(authenticated){
			return <Redirect to="/"/>
		}
		else{
			return <Component match={match} setAuthenticatedStatus={setAuthenticatedStatus}/>
		}
	}

	function setAuthenticatedStatus(){
		setAuthenticated(!authenticated)
	}


	return(
		<>
		<Header setAuthenticatedStatus={setAuthenticatedStatus} authenticated={authenticated}/>
		<Switch>
		  <Route exact path="/" render={()=><Home authenticated={authenticated} setAuthenticatedStatus={setAuthenticatedStatus}/>}/>
		  
		  <Route path="/login" component={RouteGuard(Login)}/>
		  <Route path="/register" component={RouteGuard(Register)}/>
		  
		  <Route component={PageNotFound}/>
		</Switch>
		<Footer/>
		</>
	
	)
}

