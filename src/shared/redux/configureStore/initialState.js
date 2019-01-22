const initialState = () => ({
  bets: [
    {
      id: '0',
      title: 'first bet',
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
      participants: ['jose', 'greg', 'myfriend'],
      state: 'fail'
    },
    {
      id: '1',
      title: 'first bet',
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
      participants: ['jose', 'greg', 'myfriend'],
      state: 'success'
    }
  ]
})

export default initialState
