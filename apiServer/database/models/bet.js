import mongoose from 'mongoose'

const { Schema } = mongoose

const participantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  optionId: {
    type: Schema.Types.ObjectId,
    ref: 'betoption'
  }
})

const betSchema = new Schema({
  title: String,
  description: String,
  amount: Number,
  currency: String,
  master: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  options: [{
    type: Schema.Types.ObjectId,
    ref: 'betoption'
  }],
  participants: [participantSchema]
})

export const Bet = mongoose.model('bet', betSchema)
