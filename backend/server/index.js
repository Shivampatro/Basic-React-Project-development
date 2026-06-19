import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import Booking from './models/Booking.js'
import contactsRouter from './routes/web.js'

// Load `.env` from the server folder, then also attempt to load
// a project-root `.env` (useful if you keep env at project root).
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI

async function connectDb() {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set — server will run but DB is not connected')
    return
  }

  // Mount contacts routes
  app.use('/api/contacts', contactsRouter)

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
  }
}

connectDb()

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' })
})

// example route to show server is working
app.get('/api/testdata', (req, res) => {
  res.json({ message: 'This is test data from server' })
})

app.get('/api/dbstatus', (req, res) => {
  const state = mongoose.connection.readyState // 0 = disconnected, 1 = connected
  res.json({ readyState: state })
})

// Return one sample document from the first collection found in the connected DB
app.get('/api/sample', async (req, res) => {
  try {
    const db = mongoose.connection.db
    if (!db) return res.status(500).json({ error: 'No DB connection' })
    const cols = await db.listCollections().toArray()
    if (!cols.length) return res.json({ collections: [] })
    const collName = cols[0].name
    const doc = await db.collection(collName).findOne({})
    res.json({ collection: collName, document: doc })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Scan all databases and return one sample document per database (if any)
app.get('/api/sample-all', async (req, res) => {
  try {
    const conn = mongoose.connection
    const admin = conn.db.admin()
    const list = await admin.listDatabases()
    const client = conn.getClient ? conn.getClient() : conn.client
    const results = []
    for (const d of list.databases) {
      try {
        const db = client.db(d.name)
        const cols = await db.listCollections().toArray()
        if (cols.length) {
          const doc = await db.collection(cols[0].name).findOne({})
          results.push({ db: d.name, collection: cols[0].name, document: doc })
        } else {
          results.push({ db: d.name, collection: null, document: null })
        }
      } catch (e) {
        results.push({ db: d.name, error: e.message })
      }
    }
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// List documents in a named collection (limit 100)
app.get('/api/list/:collection', async (req, res) => {
  try {
    const { collection } = req.params
    const db = mongoose.connection.db
    if (!db) return res.status(500).json({ error: 'No DB connection' })
    const exists = await db.listCollections({ name: collection }).hasNext()
    if (!exists) return res.json({ collection, count: 0, documents: [] })
    const docs = await db.collection(collection).find({}).limit(100).toArray()
    res.json({ collection, count: docs.length, documents: docs })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Mock search trains endpoint — returns sample trains based on simple criteria
app.post('/api/search-trains', (req, res) => {
  const { from, to, date, travelClass } = req.body || {}
  // In a real app you would query a database or an external API.
  // Here we return deterministic mock data for the UI to use.
  const base = [
    { id: 'T1001', name: 'Express A', from: from || 'City A', to: to || 'City B', depart: '09:00', arrive: '12:30' },
    { id: 'T1002', name: 'Intercity B', from: from || 'City A', to: to || 'City B', depart: '13:15', arrive: '16:45' },
    { id: 'T1003', name: 'Fast C', from: from || 'City A', to: to || 'City B', depart: '18:00', arrive: '21:20' },
  ]

  // Attach a simple fares object keyed by class
  const withFares = base.map((t, i) => ({
    ...t,
    fares: {
      '1A': 1500 + i * 50,
      '2A': 1000 + i * 40,
      '3A': 700 + i * 30,
      'SL': 250 + i * 10,
    },
    date: date || new Date().toISOString().slice(0, 10),
  }))

  // Optionally filter by travelClass
  const results = travelClass && travelClass !== 'All Classes'
    ? withFares.map(t => ({ ...t, fare: t.fares[travelClass] || null }))
    : withFares.map(t => ({ ...t, fare: null }))

  res.json({ results })
})

// Simple booking endpoint — echoes booking and returns a booking id
app.post('/api/book', async (req, res) => {
  try {
    const { train, passenger } = req.body || {}
    if (!train) return res.status(400).json({ error: 'train is required' })
    const doc = new Booking({ train, passenger })
    const saved = await doc.save()
    res.json({ bookingId: saved._id, saved })
  } catch (err) {
    console.error('Booking save error:', err)
    res.status(500).json({ error: err.message })
  }
})

// Simple registration endpoint: saves JSON body into `users` collection
app.post('/api/register', async (req, res) => {
  try {
    const db = mongoose.connection.db
    if (!db) return res.status(500).json({ error: 'No DB connection' })
    const user = req.body
    if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({ error: 'Empty request body' })
    }
    // Basic validation
    if (!user.email) return res.status(400).json({ error: 'email is required' })
    const payload = { ...user, createdAt: new Date() }
    const result = await db.collection('users').insertOne(payload)
    res.json({ insertedId: result.insertedId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))
