import React from 'react'

import Accodion from '../../Components/Accordion'

const DUMMYBETS = [
  {
    id: '0',
    title: 'first bet',
    body: {
      description: 'Description my descripntion hahahaha',
      amount: 10,
      currency: '£',
      options: [
        {
          opt: 'first',
          selected: true
        },
        {
          opt: 'second choice',
          selected: false
        }
      ],
      participants: ['jose', 'greg', 'myfriend']
    },
    state: 'fail'
  },
  {
    id: '1',
    title: 'first bet',
    body: {
      description: 'Description my descripntion hahahaha',
      amount: 10,
      currency: '£',
      options: [
        {
          opt: 'first',
          selected: true
        },
        {
          opt: 'first',
          selected: false
        }
      ],
      participants: ['jose', 'greg', 'myfriend']
    },
    state: 'success'
  }
]

const History = () => {
  return <div>
    { DUMMYBETS && <Accodion bets={DUMMYBETS}/> }
  </div>
}

export default History
