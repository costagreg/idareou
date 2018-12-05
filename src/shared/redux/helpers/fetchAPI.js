import 'isomorphic-fetch'

export const fetchAPI = cookie => relativePath => {
  return fetch(
    (process.env.API_URL || '') + relativePath,
    {
      headers: { cookie }
    }
  )
    .then(res => res.json())
    .catch(e => { throw new Error(e) })
}
