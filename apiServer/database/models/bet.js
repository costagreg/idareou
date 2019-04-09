import mongoose from 'mongoose'

const { Schema } = mongoose

const participantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'betoption'
  }
})

const betSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  currency: {
    type: String,
    default: '£'
  },
  master: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  options: [{
    type: Schema.Types.ObjectId,
    ref: 'betoption'
  }],
  participants: [participantSchema],
  winner: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
})

export const Bet = mongoose.model('bet', betSchema)
