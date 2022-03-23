import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import EditAuthorDialog from './editAuthorDialog/editAuthorDialog';
import { LOAD_AUTHORS } from '../../../../../GraphQL/author/Queries';
import { useStyles } from './authorsListStyles';
import Container from '../../../../../comons/container/container';
import { ERROR_DB } from '../../../../../utils/strings';
import useAuthorsList from './useAuthorsList';
import AuthorCard from './card/card';
import { Author } from '../../../../../models/author';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';

interface Props {
  getAuthorData: (author: Author) => void;
}

const AuthorsList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { getAuthorData } = props;
  const { error, loading, data } = useQuery(LOAD_AUTHORS);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const { deleteAuthor } = useAuthorsList({
    authors,
    setAuthors,
  });

  const handleEdit = (author: Author) => {
    setOpenEditDialog(true);
    setSelectedAuthor(author);
  };
  const handleDelete = (author: Author) => {
    setOpenDeleteDialog(true);
    setSelectedAuthor(author);
  };

  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors.nodes);
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
      <EditAuthorDialog
        author={selectedAuthor}
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteAuthor(selectedAuthor?.id as number)}
      />
      <Container>
        {authors.map((val: Author) => {
          if (val) {
            return (
              <AuthorCard
                author={val}
                handleDelete={() => handleDelete(val)}
                onClick={() => getAuthorData(val)}
                handleEdit={() => handleEdit(val)}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

export default AuthorsList;
