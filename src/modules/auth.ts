import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const comparePasswords = (plainPassword, hashPassword) => {
  return bcrypt.compare(plainPassword, hashPassword)
}

export const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
  )

  return token
}

export const protect = (request, response, next) => {
  const bearer = request.headers.authorization

  if (!bearer) {
    response.status(401)
    response.json({ message: 'You are not authorized to access this resource in the server' })
    return
  }

  const [, token] = bearer.split(' ')
  if (!token) {
    response.status(401)
    response.json({ message: 'Invalid token sent to the server' })
    return
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    request.user = user
    console.log(user)
    next()
  } catch (e) {
    console.log(e)
    response.status(401)
    response.json({ message: 'Invalid token sent to the server' })
    return
  }
}
