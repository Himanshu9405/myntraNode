import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    verified:{
        type: Boolean,
        default: false,
        required: true
      }
},{
    timestamps: true
})

export default mongoose.model("User",userSchema)