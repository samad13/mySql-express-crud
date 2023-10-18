const express = require('express');
const cors = require('cors');


const app = express()

//routers
const router = require('./routes/productRouter');




// middleware
app.use(cors())
app.use(express.json())
app.use('/api/products', router)

app.use(express.urlencoded({ extended: true }))

//testing api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from api' })
})

//port

const PORT = process.env.PORT || 3000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})