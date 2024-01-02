import mongoose from 'mongoose'

export const connect = async() =>{
    try {
        mongoose.connect(process.env.MONGO_URI)

        mongoose.connection.on("connect",()=>{
            console.log('Connected to DB.')
        })
        
    } catch (error) {
        console.log('Failed to connect'+error)
    }
}