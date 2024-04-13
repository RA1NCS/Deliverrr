import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log('Connected to database!'))

// Middleware - Converts body of any request we make to our API server to JSON
const app = express()
app.use(express.json())
app.use(cors())

// Endpoint
app.get('/test', async (req: Request, res: Response) => {
	res.json({ message: 'Hello!' })
})

app.listen(7001, () => {
	console.log('server started on localhost:7001')
})
