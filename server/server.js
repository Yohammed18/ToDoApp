const express = require('express')
require('dotenv').config();
const cors = require('cors')
const pool = require('./db')

let app = express()

//set the ports where our server will run
const PORT = process.env.PORT || 5000

// the cors will ensure the server and the client can communicate with each other and by pass the port issues
app.use(cors())

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



app.listen(PORT, () =>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})




