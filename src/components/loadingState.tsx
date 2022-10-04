import { BeeIcon } from 'components/icons';
import { Container, styled } from '@mui/material';
import { theme } from 'themeConfig';

const LoaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  minHeight: 128,
});

const CustomLoader = styled('div')({
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
  animationName: 'jumpy',

  '@keyframes jumpy': {
    '50%': {
      transform: 'translateY(8px)',
    },
  },
});

/**
 * A simple component that being used when data is loading
 */
export default function LoadingState() {
  return (
    <Container maxWidth='sm'>
      <LoaderWrapper>
        <CustomLoader>
          <BeeIcon fontSize='large' />
        </CustomLoader>
        <CustomLoader style={{ animationDelay: '.25s' }}>
          <BeeIcon fontSize='medium' />
        </CustomLoader>
        <CustomLoader style={{ animationDelay: '.5s' }}>
          <BeeIcon fontSize='small' />
        </CustomLoader>
      </LoaderWrapper>
    </Container>
  );
}
