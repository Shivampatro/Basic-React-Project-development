const mongoose = require('mongoose');

const contactDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneno: String,
  city: String,
  address: String
});

module.exports = mongoose.model('Contact', contactDetailsSchema);
// =============================
// CREATE
// =============================
// Import Model
const Contact = require('../model/contact_details');
router.post('/create', async(req,res) => {
    try{
        const newContact = new Contact(req.body);

        const savedData = await newContact.save();

        return res.status(201).json(savedData);
        console.log(res.status(201).json(savedData));

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }

});