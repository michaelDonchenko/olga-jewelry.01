const express = require('express')
const dotenv = require('dotenv')
// const connectDB = require('./config/db')
const app = express()
dotenv.config()
const { readdirSync } = require('fs')
const connectDB = require('./config/db')
const path = require('path')

//init middleware
app.use(express.json({ limit: '25mb' }))
// app.use(express.urlencoded({ limit: '25mb' }))

//DB connection
connectDB()

//init routes
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

//port listener
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})
