const mongoose = require ('mongoose')

async function connectDB(){
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Conneted')
    }catch(error){
        console.error('Database Connecton error', error)
        process.exit(1)
    }
}

module.exports = connectDB;