import jwt from 'jsonwebtoken'

export default (data, context) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '10s' })
  context.res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 26,
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: false,
    secure: false
  })
  return token
}
