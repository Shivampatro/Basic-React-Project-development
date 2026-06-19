import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true })

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default Contact
