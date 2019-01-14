export default () => [
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
        opt: 'second',
        choosen: false
      }
    ],
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
        selected: true
      },
      {
        opt: 'second',
        selected: false
      }
    ],
    state: 'success'
  }
]
