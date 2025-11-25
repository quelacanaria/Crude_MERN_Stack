const Book = require('../models/book.js');

const getAllBooks = async(req, res) => {
    try{
        const displayAllBooks = await Book.find({});
        if(displayAllBooks.length >= 0){
            res.status(200).json({
                success: true,
                message: 'the books successfully fetched',
                data: displayAllBooks,
            });
        }else{
            res.status(404).json({
                success: false,
                message: '404 there was a problem fetching the data',
            });
        }
    }catch(error){
        console.log('error', error);
        res.status(500).json({
            success: false,
            message: 'something went wrong!! Please try again',
        });
    }

}

const getSingleBook = async (req, res) => {
    try{ 
        const getCurrentBookId = req.params.bID;
        const bookDetailsById = await Book.findById(getCurrentBookId);

        if(!bookDetailsById){  
            res.status(404).json({
                success: false,
                message: 'There are no books found',
            });
        }
            res.status(200).json({
                success: true,
                message: `the book is successfully fetched`,
                data: bookDetailsById,
            });
    }catch(error){
        res.status(500).json({
            success: false, 
            message: 'Something went wrong',
        });
    }
}

const addNewBook = async(req, res) => {
    try{
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newlyCreatedBook){
            res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: newlyCreatedBook,
            });
        }

    }catch(error){
        if(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
        res.status(500).json({
            success: false,
            message: 'something went wrong!! Please try again'
        });
    }
};

const updateBook = async(req, res) => {
    const edited = await Book.findByIdAndUpdate(req.params.bID, req.body, { new: true });
    try{
        if(!edited){
            res.status(404).json({
                success: false,
                message: 'Book cannot find'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: edited,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

const deleteBook = async(req, res) => {
    try{
        const deleted = await Book.findByIdAndDelete(req.params.bID);
        if(!deleted){
            res.status(404).json({
                success: false,
                message: 'cannot found book',
            });
        }
        res.status(200).json({
            success: true,
            message: 'successfully deleted',
            data: deleted,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getAllBooks,
    getSingleBook,
    addNewBook,
    updateBook,
    deleteBook
};