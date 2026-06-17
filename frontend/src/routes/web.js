import express from 'express';
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// About page
router.get('/about', (req, res) => {
    res.send('About Us');
});

// Contact page
router.get('/contact', (req, res) => {
    res.send('Contact Us');
});

router.get('/services', (req, res) => {
    res.send('Our Services');
});

router.get('/register', (req, res) => {
    res.send('Register Page');
});

router.get('/book-ticket', (req, res) => {
    res.send('Book Ticket Page');
});


export default router;