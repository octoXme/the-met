import { Tooltip, IconButton } from '@mui/material';

interface IIconButton {
  title: string;
  icon: JSX.Element;
  [key: string]: any;
}

/**
 * Extension of material ui IconButton component
 * Add Tooltip by default
 * @param {string} title - explanation of the usage of the button
 * @param {any} icon
 */
const IconButtonComponent = ({ title, icon, ...other }: IIconButton) => {
  return (
    <Tooltip title={title}>
      <IconButton aria-label={title} {...other}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonComponent;
