import { Card, CardActionArea, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ImagePreview from 'components/image';
import { useEffect } from 'react';
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
}));

export default function ArtCard({ id }: IArtCard) {
  const isLoading = useAppSelector(getArtworkByIdLoading(id));
  const artwork = useAppSelector(getArtworkById(id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !artwork?.data) {
      dispatch(fetchArtById(id));
    }
  }, [artwork?.data, dispatch, id, isLoading]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Card variant='outlined'>
      <CardActionArea>
        <CardTag>{artwork?.data?.objectName}</CardTag>
        <ImagePreview
          name={artwork?.data?.title}
          src={artwork?.data?.primaryImageSmall || artwork?.data?.primaryImage}
        />
      </CardActionArea>
    </Card>
  );
}
