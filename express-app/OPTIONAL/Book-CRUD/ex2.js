//we are going to suggest you build a book directory, where you would need to create endpoints, using the four most basic methods: GET, POST, PUT and DELETE.

//You’d use GET for getting all books or getting only one book by id. With the POST method, you can add a new book to the list. You’d need the PUT method for updating the existing book, and it’s evident that with the DELETE method, you will remove the book from the list.

// you can start with data collected as a JSON file.

/////Answer
const express = require('express');
const port = 3000;
//const books = require('./books');

const app = express();

app.use(express.json());
app.use('/api/v1/books', books);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
const router = express.Router();
const books = require('./books.json');
// Get all the books
router.get('/', (req, res) => {
  res.json(books);
});

// Get a specific book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(books.filter((ele) => ele.id === parseInt(id)));
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  books.push(body);
  res.json({ message: 'The book has been added' });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  books.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      books[index] = body;
    }
  });
  res.json({ message: `The book with ID ${id} has been updated` });
  // res.json(books);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  books.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      books.splice(index);
    }
  });
  res.json({ message: `Book with id #${id} has been deleted` });
});

module.exports = router;
