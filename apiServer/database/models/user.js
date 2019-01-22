import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  email: String
})

export const User = mongoose.model('user', userSchema)
