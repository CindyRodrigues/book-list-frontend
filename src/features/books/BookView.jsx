import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "./booksSlice"
import BookList from "./BookList"
import { Link } from "react-router-dom"

const BookView = () => {
    const dispatch = useDispatch()
    const { books, status, error } = useSelector((state) => state.books)

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    return (
        <div>
            <main className="container py-5">
                <h1 className="mb-3">Book Management System</h1>
                <button className="btn btn-warning mb-3">
                    <Link to="/addBook">Add Book</Link>
                </button>
                <h2 className="mb-3">Book List</h2>
                {status === "loading" && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {status === "success" && books && <BookList books={books} />}
            </main>
        </div>
    )
}

export default BookView