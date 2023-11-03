import express from 'express';
import users from '../modules/users/router.js'
// import books from '../modules/books/router.js'
// import history from '../modules/book_history/router.js'
const router = express.Router()
router.get('/', (req, res) => {
  res.send('Login')
})

router.use('/', users)
// router.use('/books', books)
// router.use('/books', history)

export default router
