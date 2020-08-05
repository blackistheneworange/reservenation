import React,{useState,useEffect} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import axios from 'axios';

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const statDate=new Date()
statDate.setDate(statDate.getDate()+1)


export default function ReservationForm(props){

	const [details,setDetails]=useState({
		seats:props.data?props.data.seats:1,
		date:props.data?props.data.date:days[statDate.getDay()]+', '+statDate.getDate()+' '+months[statDate.getMonth()]+' '+statDate.getFullYear(),
		time:props.data?props.data.time:'11 AM',
		
		
	})
	
	const [loading,setLoading]=useState(false)
	const [timeChange,setTimeChange]=useState(true)

	useEffect(()=>{
		M.AutoInit()
	})

	function handleChange(e){
		
		setDetails({...details,[e.target.name]:e.target.value})
	}
	function handleSubmit(e){
		e.preventDefault()

		setLoading(true)

		if(props.status){
		axios.put('http://localhost:3000/reserve',{seats:details.seats,date:details.date,time:details.time,fullDate:props.data.date===details.date?props.data.fullDate:Date.now()},{withCredentials:true})
		.then(res=>{
			props.handleReservation()
		})
		.finally(e=>{
			setLoading(false)
		})
		}

		else{
		axios.post('http://localhost:3000/reserve',{seats:details.seats,date:details.date,time:details.time,fullDate:Date.now()},{withCredentials:true})
		.then(res=>{
			
			props.handleReservation()
		})
		.catch(err=>{
			//none
			
		})
		.finally(e=>{
			setLoading(false)
		})
		}
	}

	function GetDates(startDate=new Date()){
		let arr=[]
		for(let i=1;i<6;i++){
			let newDate=new Date()
			newDate.setDate(startDate.getDate()+i);
			arr.push(days[newDate.getDay()]+', '+newDate.getDate()+' '+months[newDate.getMonth()]+' '+newDate.getFullYear())
		}
		return arr
	}


	return(
		
		<div className='col s12 m6 offset-m3 l4 offset-l4'>
		{props.status && props.status==="edit"?
		<h4>Edit Reservation</h4>
		:
		<h4>Reserve A Table</h4>
		}

		<form onSubmit={handleSubmit} style={{marginTop:'24px'}}>

		<div className='row'>
  
		 <div className='input-field col s12'>
		  <select id="seats" name="seats" onChange={handleChange}>
		i
		  {[1,2,3,4,5,6,7,8,9,10].map(e=>{

		    if(props.data&&parseInt(props.data.seats)===parseInt(e)){
			return <option value={e} selected>{e}</option>
		    }
		    else{
			return <option value={e}>{e}</option>
		    }
		  })}
		    
		  </select>
		  <label style={{fontSize:'1rem'}} htmlFor="seats">Total Seats</label>
	     
		 </div>

		<div className='input-field col s12'>
		 <select id='date' name='date' onChange={handleChange}>
		
		 {GetDates().map(e=>{
			 if(props.data && props.data.date===e){
				 return <option value={props.data.date} selected>{props.data.date}</option>
			 }
			 else{
				 return <option value={e}>{e}</option>
			 }
		 })}
		 </select>
		 <label style={{fontSize:'1rem'}}htmlFor="date">Pick A Day</label>
		</div>

		<div className='input-field col s12'>
		 <select id='time' name='time' onChange={handleChange}>
	         {['11 AM','1 PM','3 PM','5 PM','8 PM'].map(e=>{
			 if(props.data && props.data.time===e){
				 return <option value={props.data.time} selected>{props.data.time}</option>
			 }
			 else{
				 return <option value={e}>{e}</option>
			 }
		 })}
		 </select>
		 <label htmlFor="time" style={{fontSize:'1rem'}}>Pick A Time</label>
		</div>
	       

		<div className='col s12'>
		 <button type="submit" className="btn light-blue">{loading?<span className='spinner'></span>:<span>{props.status?'Update':'Reserve'}</span>}</button>
		</div>

		<div className='col s12'>
		 <button type="button" className="btn light-blue" style={{marginTop:'14px'}} onClick={props.handleReservation}>Cancel</button>
		</div>

		</div>

		</form>
		</div>

	)
}
