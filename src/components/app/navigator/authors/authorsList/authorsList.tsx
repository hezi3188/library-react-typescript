import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import ConfirmDialog from '../../../../../comons/confirmDialog/confirmDialog';
import EditReaderDialog from './editAuthorDialog/editAuthorDialog';
import Reader from '../../../../../models/reader';
import { LOAD_READERS } from '../../../../../GraphQL/reader/Queries';
import { useStyles } from './authorsListStyles';
import Container from '../../../../../comons/container/container';
import { ERROR_DB } from '../../../../../utils/strings';
import useReadersList from './useAuthorsList';
import ReaderCard from './card/card';

const DELETE_DIALOG_TITLE: string = 'זהירות!';
const DELETE_DIALOG_MESSAGE: string = 'האם אתה בטוח שברצונך למחוק?';

interface Props {
  getReaderData: (reader: Reader) => void;
}

const ReadersList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { getReaderData } = props;
  const { error, loading, data } = useQuery(LOAD_READERS);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReader, setSelectedReader] = useState<Reader>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setEditAddDialog] = useState<boolean>(false);

  const { deleteReader } = useReadersList({
    readers: readers,
    setReaders: setReaders,
  });

  const handleEdit = (r: Reader) => {
    setEditAddDialog(true);
    setSelectedReader(r);
  };
  const handleDelete = (r: Reader) => {
    setOpenDeleteDialog(true);
    setSelectedReader(r);
  };

  useEffect(() => {
    if (data) {
      setReaders(data.allReaders.nodes);
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
      <EditReaderDialog
        reader={selectedReader}
        open={openEditDialog}
        onClose={() => setEditAddDialog(false)}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        title={DELETE_DIALOG_TITLE}
        message={DELETE_DIALOG_MESSAGE}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => deleteReader(selectedReader?.id as number)}
      />
      <Container>
        {readers.map((val: Reader) => {
          if (val) {
            return (
              <ReaderCard
                reader={val}
                handleDelete={() => handleDelete(val)}
                onClick={() => getReaderData(val)}
                handleEdit={() => handleEdit(val)}
              />
            );
          }
        })}
      </Container>
    </div>
  );
};

export default ReadersList;
