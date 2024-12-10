import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

// This will run for all routes in this server.
app.use(cors()) // cors is a config that tell browsers who or what can access this api
// by default it means all can access this api, but we can block on certain conditions.
app.use(morgan('dev')) // it just do console.log and then call next() thing in the stack
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use((req: any, res, next) => {
//   // here we can augmented the request object
//   // attaching new information to it and will be used for all the request that were written after this middleware

//   res.status(401)
//   res.send('Nope')
//   // if we don't use next then it will stop processing anything in the stack
// })

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({ message: 'Hello world' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized user' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid input' })
  } else {
    res.status(500).json({ message: 'Oops, there is something wrong with the server' })
  }
})

export default app
