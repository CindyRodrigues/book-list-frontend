import { useDispatch } from "react-redux"
import { deleteBookAsync } from "./booksSlice"

const BookList = ({ books }) => {
    const dispatch = useDispatch()

    const handleDelete = (bookId) => {
        dispatch(deleteBookAsync(bookId))
    }

    return (
        <ul className="list-group">
            {
                books.map((book) => (<li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{book.bookName}</strong> by {book.author} (Genre: {book.genre})
                    </div>
                    <div>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
                    </div>
                </li>))
            }
        </ul>
    )
}

export default BookList