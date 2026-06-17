import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  train: { type: Object, required: true },
  passenger: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema)
