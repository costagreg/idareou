import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newSchema = new Schema({
  username: String,
  password: String,
  laspost: Date,
  numpostperday: Number,
  numtotalpost: Number
})

export const User = mongoose.model('user', newSchema)
