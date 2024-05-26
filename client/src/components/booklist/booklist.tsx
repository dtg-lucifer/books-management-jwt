// src/components/BookList.tsx
import React from "react";
// import { useAuthenticatedApi } from "../../hooks/useAuthenticatedApi";
import { IBook } from "../../types/book.interface";

const BookList: React.FC = () => {
  // const {
  //   data: books,
  //   loading,
  //   error,
  //   refetch,
  // } = useAuthenticatedApi<IBook[]>({
  //   url: "/api/books",
  //   method: "GET",
  //   fetchOnMount: true,
  // });

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Book List</h1>
      {/* <ul>
        {books?.map((book) => (
          <li key={book._id as string}>
            {book.title} by {book.author} ({book.year})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>Refresh</button> */}
    </div>
  );
};

export default BookList;
