require('dotenv').config()

const app = require('./app')
const connectDB = require('./db/connect')

const port = process.env.PORT || 3000


const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`On http://localhost:${port}`))
    }catch(err){
        console.error(err.message)
    }
}

start()