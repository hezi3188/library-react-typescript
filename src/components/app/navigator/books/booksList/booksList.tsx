import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import EditBookDialog from './editBookDialog/editBookDialog';
import { GET_BOOKS } from '../../../../../GraphQL/book/Queries';
import { useStyles } from './booksListStyles';
import Container from '../../../../../comons/container/container';
import { ERROR_DB } from '../../../../../utils/strings';
import useBooksList from './useBooksList';
import BookCard from './card/card';
import Book from '../../../../../models/book';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';

interface Props {
  getBookData: (book: Book) => void;
}

const BooksList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { getBookData } = props;
  const { error, loading, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setEditAddDialog] = useState<boolean>(false);

  const { deleteBook } = useBooksList({
    books: books,
    setBooks: setBooks,
  });

  const handleEdit = (book: Book) => {
    setEditAddDialog(true);
    setSelectedBook(book);
  };
  const handleDelete = (book: Book) => {
    setOpenDeleteDialog(true);
    setSelectedBook(book);
  };

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks.nodes);
    }
  }, [data]);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <h1>{ERROR_DB}</h1>;
  }
  return (
    <div className={classes.root}>
      <EditBookDialog
        book={selectedBook}
        open={openEditDialog}
        onClose={() => setEditAddDialog(false)}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteBook(selectedBook?.id as number)}
      />
      <Container>
        {books.map((val: Book) => {
          if (val) {
            return (
              <BookCard
                book={val}
                handleDelete={() => handleDelete(val)}
                onClick={() => getBookData(val)}
                handleEdit={() => handleEdit(val)}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

export default BooksList;
