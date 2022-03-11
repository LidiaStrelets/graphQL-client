import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

const LOAD_BOOKS_NAMES = gql`
  query {
    books {
      name
    }
  }
`;
const ADD_BOOK = gql`
  mutation addBook($name: String!, $authorId: Int!) {
    addBook(name: $name, authorId: $authorId) {
      name
    }
  }
`;

const App = () => {
  const { data } = useQuery(LOAD_BOOKS_NAMES);
  const [addBook, { error }] = useMutation(ADD_BOOK);

  useEffect(() => {
    data && data.books.forEach((b) => console.log(b.name));
  }, [data]);

  return (
    <div>
      <p>hello graphQL!!!</p>
      <button
        onClick={() => {
          addBook({ variables: { name: "test book add", authorId: 3 } });
          if (error) console.log(error);
        }}
      >
        add book
      </button>
    </div>
  );
};

export default App;
