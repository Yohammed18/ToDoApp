import React from 'react'
import Modal from '../Modal/Modal'

const ListHeader = ( {listName }) =>{

    const signOut = () =>{
        console.log('You have signed out')
    }

  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="btn btn-success btn-lg">Add New</button>
        <button className="btn btn-warning btn-lg" onClick={signOut}>Sign Out</button>
      </div>
      <Modal />
    </div>
  )
}

export default ListHeader
