import mongoose from 'mongoose'

const { Schema } = mongoose

const betSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
})

export const Bet = mongoose.model('bet', betSchema)
