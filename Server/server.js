require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/database.js');
const bookRoutes = require('./routes/book-routes.js');
const cors = require('cors');
const app = express();

//connection
connectToDb(); 

//middleware -> express.json()
app.use(express.json());

app.use(cors());

//routes here
app.use("/api/books", bookRoutes);

const PORT = (process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server is listening to the PORT ${PORT}`);
});