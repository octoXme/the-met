import { Card, CardActionArea, Skeleton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { openDialog } from 'features/dialog/dialogSlice';
import { useEffect, useState } from 'react';
import { theme } from 'themeConfig';
import ArtObjectDetail from './artObjectDetail';
import {
  fetchArtById,
  getArtworkById,
  getArtworkByIdLoading,
} from './artSlice';

interface IArtCard {
  id: number;
}

const CardTag = styled('div')(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(2),
  backgroundColor: '#fff',
  color: '#000',
  zIndex: 1,
  borderRadius: theme.shape.borderRadius / 2,
  fontWeight: 700,
  boxShadow: theme.shadows[1],
}));

const ImageTag = styled('img')({
  display: 'block',
  width: '100%',
  filter: 'grayscale(1)',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  transition: theme.transitions.create('border', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),

  '&:hover': {
    filter: 'inherit',
    borderColor: theme.palette.primary.main,
  },
});

export default function ArtCard({ id }: IArtCard) {
  const isLoading = useAppSelector(getArtworkByIdLoading(id));
  const artwork = useAppSelector(getArtworkById(id));
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!isLoading && !artwork?.data) {
      dispatch(fetchArtById(id));
    }

    if (artwork?.data) {
      setImageSrc(
        artwork?.data?.primaryImageSmall || artwork?.data?.primaryImage
      );
    }
  }, [artwork?.data, dispatch, id, isLoading]);

  if (isLoading) {
    return <Skeleton height={250} />;
  }

  const openArtObject = () =>
    dispatch(
      openDialog({
        maxWidth: 'lg',
        children: <ArtObjectDetail art={artwork?.data} />,
      })
    );
    
  const handleError = () => {
    setImageSrc(`${process.env.PUBLIC_URL}/img/no-photo.png`);
    setLoading(false);
  };

  return (
    <Card variant='outlined'>
      <CardActionArea onClick={openArtObject}>
        <CardTag>
          {artwork?.data?.objectName} <small>{id}</small>
        </CardTag>
        <ImageTag
          alt={artwork?.data?.title}
          src={imageSrc}
          onLoad={() => setLoading(false)}
          onError={handleError}
          sx={{ display: loading ? 'none' : 'block' }}
        />
      </CardActionArea>
    </Card>
  );
}
