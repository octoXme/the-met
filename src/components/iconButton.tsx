import { Tooltip, IconButton } from '@mui/material';

interface IIconButton {
  title: string;
  icon: React.ReactElement;
  [key: string]: any;
}

export default function IconButtonComponent({
  title,
  icon,
  ...other
}: IIconButton) {
  return (
    <Tooltip title={title}>
      <IconButton aria-label={title} {...other}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
