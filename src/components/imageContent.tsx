import { CardMedia, Skeleton } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { ImageFallBackIcon } from './icons';

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  fallback: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing(1),
    height: '100%',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.action.disabled,
    textAlign: 'center',
  },
}));

interface IImage {
  image: string | undefined;
  children?: React.ReactNode;
  className?: string;
  fallbackMessage?: React.ReactElement | string;
}

export default function ImageContent({
  image,
  children,
  className,
  fallbackMessage,
  ...other
}: IImage) {
  const { classes, cx } = useStyles();
  const [loading, setLoading] = useState(true);

  const imageComponent = () => {
    if (!image) {
      return (
        <div className={classes.fallback}>
          <ImageFallBackIcon fontSize='large' />
          <div>{fallbackMessage}</div>
        </div>
      );
    }

    return (
      <>
        {loading && <Skeleton variant='rectangular' height='100%' />}
        <img
          alt=''
          src={image}
          onLoad={() => setLoading(false)}
          className={classes.image}
        />
      </>
    );
  };

  return (
    <CardMedia className={cx(classes.root, className)} {...other}>
      <div className={classes.imageContainer}>{imageComponent()}</div>
      {children}
    </CardMedia>
  );
}
