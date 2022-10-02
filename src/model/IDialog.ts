export interface IDialogState {
  open: boolean;
  options: {
    children: JSX.Element;
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };
}
