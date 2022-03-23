export interface UseEditAuthorDialogIncome {
  handleClose: () => void;
}
export interface UseEditAuthorDialogOutcome {
  editAuthor: (firstName: string, lastName: string, authorId: number) => void;
}
