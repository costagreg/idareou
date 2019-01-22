export const ADD_BET = 'BETS/ADD_BET'

export const addBet = (newBet) => ({
  type: ADD_BET,
  payload: {
    newBet
  }
})

export const fetchToStore = (data) => (dispatch) => //  getState, fetchAPI
  new Promise((resolve) => { // Add the proper fetchApi
    resolve(dispatch(addBet(data)))
  })

const reducer = (state = [], action) => {
  const { type, payload } = action

  switch(type) {
    case ADD_BET:
      return state.concat(payload.newBet)
    default:
      return state
  }
}

export default reducer
