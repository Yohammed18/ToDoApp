import React, { useState } from 'react'
import { useCookies } from 'react-cookie'




const Modal = ({ mode, setShowModal, task, getData}) => {
    
    const [cookie, setCookie, removeCookie] = useCookies(null)
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookie.Email,
        title: editMode ? task.title : '',
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date()
    })

    const postData = async (e) =>{
        e.preventDefault()
        try {
            
            const response = await fetch(` ${process.env.REACT_APP_SERVERURL}/todos`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            if(response.status === 201){
                console.log('A NEW TASK HAS BEEN CREATED.')
                setShowModal(false) 
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const editData = async(e) =>{
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })

            if(response.status === 200){
                setShowModal(false)
                getData()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) =>{
        e.preventDefault()
        const {name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }
    
    return (
        <div className='overlay'>
            <div className='modal-style'>
                <div className='form-title-container'>
                    <h3>Let's {mode} your task</h3>
                    <button className="btn btn-danger"
                    onClick={() => setShowModal(false)}
                    >X</button>
                </div>
                <form>
                    <input 
                    required
                    maxLength={30}
                    placeholder='Insert your task'
                    name='title'
                    value={data.title}
                    type="text" 
                    onChange={(e) => handleChange(e)}
                    className="form-control" />

                    <br />
                    <label htmlFor="range">Drag to select your current progress </label>
                    <input 
                    id='range'
                    type="range" 
                    required
                    min={"0"}
                    max={"100"}
                    name='progress'
                    value={data.progress}
                    onChange={handleChange}                    
                    className="form-control" 
                    />
                    <input type="submit" className='btn btn-success' 
                    onClick={editMode? editData : postData}/>
                </form>
            </div>
        </div>
    )
}

export default Modal
