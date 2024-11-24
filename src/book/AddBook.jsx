import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../features/book/bookSlice";
import ViewBook from "./ViewBook";

function AddBook() {
  const [book, setBook] = useState({});
  const [updateId, setUpdateId] = useState("");

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
    // console.log(book);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateId == "") {
      dispatch(addBook(book));
      // dispatch(getBook(book));
    } else {
      dispatch(updateBook(book));
      setUpdateId("");
    }
    setBook({});
  };

  let handleUpdate = (book) => {
    setBook(book);
    setUpdateId(book.id);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center m-3 bg-warning"><u className="text-light text-decoration-none">Add Book</u></h2>
        <form className="mt-3 mx-auto w-50 bg-light" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={book.title || ""}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description:</label>
            <input
              type="text"
              className="form-control"
              name="dsc"
              value={book.dsc || ""}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={book.price || ""}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
        <ViewBook handleUpdate={handleUpdate} />
      </div>
    </>
  );
}

export default AddBook;
