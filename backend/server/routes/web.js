import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import Contact from '../models/Contact.js'

// Create a new contact
router.post('/create-contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body)
    const savedContact = await newContact.save()
    res.status(201).json(savedContact)
  }
    catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})


//Get all contacts
router.get('/all-contacts', async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});



// Get contact by ID
router.get('/find-by/:id', async (req, res) => {
  try {

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      })
    }

    res.status(200).json(contact)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
})

//Validate correct ID 

router.get('/find-by-valid-id/:id', async (req, res) => {
  try {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      })
    }

    const contact = await Contact.findById(id)

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      })
    }

    res.status(200).json(contact)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
})

// Update Contact ID
router.put('/update-contact-by-id/:id', async (req, res) => {
  try {

    const { id } = req.params

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      })
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // run schema validations
      }
    )

    if (!updatedContact) {
      return res.status(404).json({
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      message: 'Contact updated successfully',
      data: updatedContact
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
})


// Delete Contact by ID
router.delete('/delete-contact-by-id/:id', async (req, res) => {
  try {

    const { id } = req.params

    // Check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      })
    }

    const deletedContact = await Contact.findByIdAndDelete(id)

    if (!deletedContact) {
      return res.status(404).json({
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      message: 'Contact deleted successfully',
      data: deletedContact
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
})


export default router
