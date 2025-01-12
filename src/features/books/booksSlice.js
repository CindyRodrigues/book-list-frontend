import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await axios.get("https://book-list-backend-rose.vercel.app/books")
    return response.data
})

export const deleteBookAsync = createAsyncThunk("books/deleteBook", async (bookId) => {
    const response = await axios.delete(`https://book-list-backend-rose.vercel.app/books/${bookId}`)
    return response.data
})

export const addBookAsync = createAsyncThunk("books/addBook", async (newBook) => {
    const response = await axios.post("https://book-list-backend-rose.vercel.app/books", newBook)
    return response.data
})

export const updateBookAsync = createAsyncThunk("books/updateBook", async ({ bookId, updatedBook }) => {
    const response = await axios.put(`https://book-list-backend-rose.vercel.app/books/${bookId}`, updatedBook)
    return response.data
})

export const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "success"
            state.books = action.payload
        })
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(deleteBookAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(deleteBookAsync.fulfilled, (state,action) => {
            state.status = "success"
            state.books = state.books.filter((book) => book._id !== action.payload.book._id)
        })
        builder.addCase(deleteBookAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(addBookAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addBookAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.books.push(action.payload)
        })
        builder.addCase(addBookAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(updateBookAsync.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateBookAsync.fulfilled, (state, action) => {
            state.status = "success"
            const index = state.books.findIndex((book) => book._id === action.payload._id)
            if(index >= 0) {
                state.books[index] = action.payload
            }
        })
        builder.addCase(updateBookAsync.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export default booksSlice.reducer