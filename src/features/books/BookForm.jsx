import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBookAsync } from "./booksSlice"
import { useNavigate } from "react-router-dom"

const BookForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        bookName: "",
        author: "",
        genre: ""
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
        dispatch(addBookAsync(formData))
        setFormData({
            bookName: "",
            author: "",
            genre: ""
        })
        setSuccessMessage("Book added successfully!")
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div className="container py-5">
            <h2 className="mb-3">Add Book</h2>
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
                <button type="submit" className="btn btn-primary mb-3">Add</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )
}

export default BookForm