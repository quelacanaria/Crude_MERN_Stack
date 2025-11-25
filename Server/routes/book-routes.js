const { 

        getAllBooks,
        getSingleBook,
        addNewBook,
        updateBook,
        deleteBook

    } = require('../controllers/book-controller.js');

const express = require('express');

//create express router
const router = express.Router();

//all the routes that are related to books only
router.get('/get', getAllBooks);
router.get('/get/:bID', getSingleBook);
router.post('/add', addNewBook);
router.put('/update/:bID', updateBook);
router.delete('/delete/:bID', deleteBook);

module.exports = router;