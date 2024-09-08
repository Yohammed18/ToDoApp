import React, { useState } from 'react'
import Modal from '../Modal/Modal'

const ListHeader = ( {listName, getData }) =>{

    const [showModal, setShowModal] = useState(false)

    const signOut = () =>{
        console.log('You have signed out')
    }

  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="btn btn-success btn-lg" onClick={() => setShowModal(true)}>Add New</button>
        <button className="btn btn-warning btn-lg" onClick={signOut}>Sign Out</button>
      </div>
     {
     showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>
     }
    </div>
  )
}

export default ListHeader
