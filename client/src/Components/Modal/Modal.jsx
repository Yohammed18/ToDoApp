import React, { useState, useEffect } from 'react'

const Modal = () => {
    const mode = 'create'
    const editMode = mode === 'edit' ? true : false


    const [newTask, setNewTask] = useState('')
    const [data, setData] = useState({
        user_email: "",
        title: '',
        progress: "",
        date: editMode ? "" : new Date()
    })
    

    const handleChange = (e) =>{
        e.preventDefault()
        const {name, value } = e.target
        setNewTask(value)
        console.log('name: ', name)
        console.log('value ', value)
        setData(data => ({
            ...data,
            [name]: value
        }))

        console.log(data)
    }

    
    return (
        <div className='overlay'>
            <div className='modal-style'>
                <div className='form-title-container'>
                    <h3>Let's {mode} your task</h3>
                    <button className="btn btn-danger">X</button>
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
                    <input type="submit" className='btn btn-success' />
                </form>
            </div>
        </div>
    )
}

export default Modal
