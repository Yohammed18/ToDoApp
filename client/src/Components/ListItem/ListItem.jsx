import React from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import TickIcon from '../TickIcon/TickIcon'

const ListItem = ( {task}) => {



  return (
    <li className='list-item'>
      
      <div className="info-container">
        <TickIcon />
       <p className='task-title'>{task.title}</p> 
       <ProgressBar />
      </div>

      <div className="button-container">
        <button className="btn btn-info btn-sm">EDIT</button>
        <button className="btn btn-danger btn-sm">DELETE</button>
      </div>
    </li>
  )
}

export default ListItem
