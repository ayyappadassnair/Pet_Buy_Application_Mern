import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum: ['dog', 'cat', 'cow', 'bird', 'fish', 'reptile'],
        required:true
    },
    image:{
        type:String,
    }
},
{
    timestamps:true
})

export const petModel = mongoose.model("Pets",petSchema)