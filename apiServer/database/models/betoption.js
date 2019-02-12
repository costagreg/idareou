import mongoose from 'mongoose'

const { Schema } = mongoose

const betOptionsSquema = new Schema({
  title: String
})

export const BetOption = mongoose.model('betoption', betOptionsSquema)
