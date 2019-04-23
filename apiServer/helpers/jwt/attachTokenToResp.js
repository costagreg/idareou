import jwt from 'jsonwebtoken'

export default (data, context) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '30d' })
  context.res.cookie('token', token, {
    maxAge: 30 * 60 * 60 * 24,
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: false,
    secure: false
  })
  return token
}
