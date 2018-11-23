import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newSchema = new Schema({
  username: String,
  password: String
})

export const User = mongoose.model('user', newSchema)
