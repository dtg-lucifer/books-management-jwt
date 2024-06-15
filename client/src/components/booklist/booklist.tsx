import React, { useEffect, useState } from "react";
import { IBook } from "../../types/book.interface";
import { useQuery } from "react-query";
import { getAllBooks } from "../../utils/api";
import styles from "../../pages/bookshowcase/books.module.scss";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  const { data, error, isLoading, refetch } = useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await getAllBooks<IBook[]>();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      setBooks(data);
    },
  });

  useEffect(() => {
    const listItems = document.querySelectorAll<HTMLLIElement>("ul li");

    listItems.forEach((item) => {
      item.style.backgroundColor = generateNeutralColor();
    });

    function generateNeutralColor() {
      const base = 50;
      const variation = 70;

      const r = Math.floor(base + Math.random() * variation);
      const g = Math.floor(base + Math.random() * variation);
      const b = Math.floor(base + Math.random() * variation);

      return `rgb(${r}, ${g}, ${b})`;
    }
  }, [books]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.main__wrapper}>
      <h1>
        <span>Book</span> List
      </h1>
      <ul className={styles.book}>
        {books?.map((book) => (
          <li key={book._id as string}>
            <span>
              {book.title} - ({book.yearPublished})
            </span>
            <span>~ {book.author}</span>
            <span>
              <button onClick={() => {}}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
      <div>
        <button style={{marginInline: "1rem"}} onClick={() => refetch()}>Refresh</button>
        <button style={{marginInline: "1rem"}} onClick={() => document.cookie = ""}>Logout</button>
      </div>
    </div>
  );
};

export default BookList;
