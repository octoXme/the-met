import { Skeleton, styled } from '@mui/material';
import { useState } from 'react';

interface IImage {
  name: string | undefined;
  src: string | undefined;
}

const ImageTag = styled('img')({
  display: 'block',
  width: '100%',
  filter: 'grayscale(1)',

  '&:hover': {
    filter: 'inherit',
  },
});

export default function ImagePreview({ name, src }: IImage) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const handleError = (e: any) => {
    setImageSrc('/img/no-photo.png');
    setLoading(false);
  };

  return (
    <>
      {loading && <Skeleton variant='rounded' height={400} />}
      <ImageTag
        alt={name}
        src={imageSrc}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
    </>
  );
}
