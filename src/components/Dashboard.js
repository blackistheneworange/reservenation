import React,{useState} from 'react';  
import {useHistory,Redirect} from 'react-router-dom';
import axios from 'axios';

import MyReservation from './MyReservation';
import ReservationForm from './ReservationForm';

export default function Dashboard(props){

	const history=useHistory()

	const [reservation,setReservation]=useState(true)
	const [reservationForm,setReservationForm]=useState(false)
	const [edit,setEdit]=useState(false)
	const [data,setData]=useState(null)

	

	function handleReservation(){
		setEdit(false)
		setReservationForm(!reservationForm)
	}

	function handleData(data){
		
		setData(data)
	}

	function handleEdit(){
		setEdit(!edit)
		setReservationForm(!reservationForm)
	}



        return(
		<div className='row' style={{margin:'50px 20px 0 20px'}}>

		<div className='col s12'>

		{edit?
		<ReservationForm handleReservation={handleReservation} status='edit' data={data}/>
		:
		reservationForm?
		<ReservationForm handleReservation={handleReservation}/>
		:
		<MyReservation handleReservation={handleReservation} handleData={handleData} handleEdit={handleEdit}/>
		}

	
		</div>
		</div>
        )
}

