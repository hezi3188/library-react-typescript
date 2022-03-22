export interface UseEditBookDialogIncome {
  handleClose: () => void;
}
export interface UseEditBookDialogOutcome {
  editBook: (id: number, name: string) => void;
}
