import React, { useEffect, useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import TickIcon from '../TickIcon/TickIcon'
import Modal from '../Modal/Modal'

const ListItem = ( {task, getData}) => {

  const [showModal, setShowModal] = useState(false)
  const [readableDate, setReadableDate] = useState('')
  const [readableTime, setReadableTime] = useState('')
  useEffect(() =>{
    const date = new Date(task.date)

    const stringDate = date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
      });

      const readableTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false // for 24-hour format
      });
    
      setReadableDate(stringDate)
      setReadableTime(readableTime)
  }, [readableDate, readableTime])

  
  const deleteItem = async ()=>{
    try {
      
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method: "DELETE"
      })

      if(response.status === 200){
        getData()
      }

    } catch (error) {
      console.error(error)
    }
  }



  return (
    <li className='list-item'>
      
      <div className="info-container">
        <TickIcon />
       <p className='task-title'>{task.title}<br />{readableDate} - {readableTime}</p> 
       <ProgressBar progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className="btn btn-info btn-sm" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="btn btn-danger btn-sm"
        onClick={() => deleteItem()}
        >DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
    </li>
  )
}

export default ListItem
