import jwt from 'express-jwt'

export default jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token
    }
    return null
  }
})
