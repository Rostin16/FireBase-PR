import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

// add data
export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/.json", newBook);
      console.log(res);
      return { ...newBook, id: res.data.name };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//get data
export const getBook = createAsyncThunk(
  "books/getBook",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/.json");
      console.log(res.data);
      return Object.keys(res.data).map((key) => ({
        id: key,
        ...res.data[key],
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete data
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await apiInstance.delete(`/${id}.json`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// edit data
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      let obj = {
        title: book.title,
        dsc: book.dsc,
        price: book.price,
      };
      await apiInstance.put(`/${book.id}.json`, obj);
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builer) => {
    builer
      // add data
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get data
      .addCase(getBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete data
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      // update data
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => {
          let { id, title, dsc, price } = action.payload;
          if (book.id == id) {
            (book.title = title), (book.dsc = dsc), (book.price = price);
          }
          return book;
        });
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
