import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBookAsync, updateBookAsync } from "./booksSlice"
import { useLocation, useNavigate } from "react-router-dom"

const BookForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [formData, setFormData] = useState({
        bookName: location.state?.bookName || "",
        author: location.state?.author || "",
        genre: location.state?.genre || ""
    })
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(location.state) {
            const bookId = location.state?._id
            const updatedBook = formData
            dispatch(updateBookAsync({ bookId, updatedBook }))
            setSuccessMessage("Book updated successfully!")
        } else {
            const newStudent = formData
            dispatch(addBookAsync(newStudent))
            setSuccessMessage("Book added successfully!")
        }
        setFormData({
            bookName: "",
            author: "",
            genre: ""
        })
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div className="container py-5">
            <h2 className="mb-3">{location.state ? "Edit Book" : "Add Book"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="bookName" className="form-label">Name:</label>
                    <input type="text" id="bookName" name="bookName" value={formData.bookName} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input type="text" id="author" name="author" value={formData.author} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <input type="text" id="genre" name="genre" value={formData.genre} className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary mb-3">{location.state ? "Update" : "Add"}</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}

export default BookForm