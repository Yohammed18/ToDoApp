const express = require('express')
require('dotenv').config();
const cors = require('cors')
const pool = require('./db')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let app = express()

//set the ports where our server will run
const PORT = process.env.PORT || 5000

// the cors will ensure the server and the client can communicate with each other and by pass the port issues
app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail', async (req, res) =>{
    
    //destruct to get the email that is passed by the client server
    const {userEmail} = req.params

    try {
        //await 
        const result = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json({
            status: 200,
            data: result.rows
        })

    } catch (error) {
        console.error('Server Error: ', error.stack)
    }
})

// create todos
app.post('/todos', async (req, res) =>{
    const {user_email, title, progress, date} = req.body
    const id = uuidv4()

    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`, [id, user_email, title, progress, date])

        res.status(201).json(newToDo)
    } catch (err) {
        console.error(err)
    }
})

// edit todos
app.put('/todos/:id', async (req, res)=>{
    const {id} = req.params
    const {user_email, title, progress, date} = req.body

    try {
        const editTodo = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress =$3, date = $4 where id = $5;`, [user_email, title, progress, date, id])

        res.json(editTodo)

    } catch (error) {
        console.error(error)
    }
})

// delete todos
app.delete('/todos/:id', async (req,res)=>{
    const {id} = req.params

    try {
        const deleteTodo = await pool.query(`DELETE FROM todos where id = $1;`, [id])
        res.status(200).json(deleteTodo)
        
    } catch (error) {
        console.error(error)
    }
})


// signup
app.post('/signup', async (req, res) =>{
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])

        //generate token
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        
        res.json({email, token})
        
    } catch (err) {
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
        
    }
})

// login
app.post('/login', async (req, res) =>{
    const { email, password } = req.body

    try {
        const users = await pool.query('SELECT * FROM users where email = $1', [email])

        if(!users.rows.length) return res.json({detail: 'User does not exist!'})

        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        //generate token
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        if (success){
            res.json({
                'email': users.rows[0].email, token
            })
        }else {
            res.json({
                detail: 'Login failed'
            })
        }
        
    } catch (err) {
        console.error(err)
    }
})


app.listen(PORT, () =>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})




