import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function MyReservation(props){

	const [reservation,setReservation]=useState(true)
	const [details,setDetails]=useState(null)
	const [loading,setLoading]=useState(false)
	const [loading2,setLoading2]=useState(false)

	useEffect(()=>{

		setLoading(true)

		axios.get('/reserve',{withCredentials:true})
		.then(res=>{
			
			if(res.data.seats){
				
				props.handleData(res.data)
				setDetails(res.data)
			}
			else{
		   	  setReservation(false)
			}

		})
		.catch(err=>{
			
			setReservation(false)
		})
		.finally(e=>{
			setLoading(false)
		})

		
	},[])


	function handleDelete(){

		setLoading2(true)

		axios.delete('/reserve',{withCredentials:true})
		.then(res=>{
			setReservation(false)
		})
		.catch(err=>{
			alert(err)
		})
		.finally(e=>{
			setLoading2(false)
		})
	}

	return(

		<>

		<h4><u>My Reservation</u></h4>

		{loading?
			<center><span style={{margin:'42px 0'}}  className='spinner2'></span></center>
		:

		!reservation?

		<>
		<center style={{marginTop:'44px'}}><i>No Reservation Found</i><br/>
		<button style={{marginTop:'14px'}} onClick={props.handleReservation} className='btn light-blue waves-effect'>Make A Reservation</button>
		</center>
		</>
		:

		details?

		<div style={{padding:'16px'}} className="light-blue white-text z-depth-2">
		 <small style={{fontStyle:'italic'}}>Reservation ID {details._id}</small>
		 <p style={{fontSize:'1.5rem'}}>Reserved A Table For {details.time} on {details.date}</p>
		 <p>A Total Of {details.seats} Seats Booked</p>

		 <div className='control-buttons'>
			<button className='waves-effect waves-blue btn light-blue lighten-1' onClick={props.handleEdit}>Edit</button>
			<button className='waves-effect waves-blue btn light-blue lighten-1' style={{marginLeft:'16px'}} onClick={handleDelete}>{loading2?<span className='spinner'></span>:<span>Cancel</span>}</button>

		 </div>
		  
		</div>

		:''
		}

		</>

	)
}
