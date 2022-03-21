export interface UseAddBookDialogInput {
  handleClose: () => void;
}
export interface UseAddBookDialogOutput {
  editReader: (firstName: string, lastName: string, readerId: number) => void;
}
