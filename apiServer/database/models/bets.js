import mongoose from 'mongoose'

const { Schema } = mongoose

const betSchema = new Schema({
  title: String,
  description: String,
  amount: Number
})

export const Bet = mongoose.model('bet', betSchema)
