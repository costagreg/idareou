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
          choosen: true
        },
        {
          opt: 'second choice',
          choosen: false
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
          choosen: true
        },
        {
          opt: 'first',
          choosen: false
        }
      ],
      participants: ['jose', 'greg', 'myfriend']
    },
    state: 'success'
  }
]

const HistoryPage = () => {
  return <div>
    { DUMMYBETS && <Accodion bets={DUMMYBETS}/> }
  </div>
}

export default HistoryPage
