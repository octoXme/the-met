import {
  Badge,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { DetailIcon } from './icons';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    wordBreak: 'break-word',
  },
  icon: {
    width: 40,
    display: 'flex',
    color: theme.palette.text.secondary,
  },
}));

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: `4px solid ${theme.palette.common.black}`,
  },
}));

export interface IListItem {
  icon?: React.ReactElement;
  tooltip?: string;
  title: string;
  content: string | React.ReactElement;
}

export default function ListItem({
  icon = <DetailIcon />,
  title,
  content,
  tooltip,
}: IListItem) {
  const { classes } = useStyles();

  if (!content) return null;

  return (
    <div className={classes.root}>
      <HtmlTooltip title={tooltip}>
        <div className={classes.icon}>
          <Badge color='info' variant='dot' invisible={!tooltip}>
            {icon}
          </Badge>
        </div>
      </HtmlTooltip>
      <div className={classes.content}>
        <Typography color='textSecondary' variant='subtitle2'>
          {title}
        </Typography>

        {content}
      </div>
    </div>
  );
}
