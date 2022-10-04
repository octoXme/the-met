import {
  Chip,
  DialogContent,
  DialogTitle,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import IconButton from 'components/iconButton';
import { CloseIcon, InfoIcon } from 'components/icons';
import ImageContent from 'components/imageContent';
import ListItem, { IListItem } from 'components/listItem';
import { closeDialog } from 'features/dialog/dialogSlice';
import { IArtObject } from 'model/IArtObject';
import { makeStyles } from 'tss-react/mui';

const useStyle = makeStyles()((theme) => ({
  header: {
    padding: 0,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    flex: 1,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '320px',
    filter: 'grayscale(40%)',
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 480,
    },
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1,
    background: theme.palette.common.black,
  },
  title: {
    minWidth: 320,
    color: theme.palette.getContrastText(theme.palette.common.white),
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2),
  },
  subtitle: {
    fontWeight: 300,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3, 2, 2, 2),
  },
}));

const SectionItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

interface IArtObjectDetail {
  art: IArtObject | undefined;
}

const renderItem = (item: IListItem) => (
  <ListItem
    key={item.title}
    icon={item.icon || <InfoIcon />}
    title={item.title}
    content={item.content}
    tooltip={item.tooltip}
  />
);

const renderDetailSection = (title: string, items: IListItem[]) => (
  <SectionItem>
    <Typography variant='h6'>{title}</Typography>
    <Grid container spacing={3}>
      {items.map((item) => {
        if (!item.content) return undefined;
        return (
          <Grid item xs={6} key={item.title}>
            {renderItem(item)}
          </Grid>
        );
      })}
    </Grid>
  </SectionItem>
);

export default function ArtObjectDetail({ art }: IArtObjectDetail) {
  const { classes } = useStyle();

  const dispatch = useAppDispatch();

  if (!art) return null;

  const artworkDetails = getArtworkDetails(art);
  const additionalDetails = getAdditionalDetails(art);

  const ImageFallbackMessage = () => (
    <>
      <Typography variant='h5'>NO ARTWORK IMAGE</Typography>
      <Typography>(or unavailable under open access)</Typography>
    </>
  );

  return (
    <>
      <DialogTitle className={classes.header}>
        <ImageContent
          className={classes.image}
          image={art.primaryImage}
          fallbackMessage={<ImageFallbackMessage />}
        >
          <div className={classes.close}>
            <IconButton
              color='inherit'
              icon={<CloseIcon />}
              title='Close'
              onClick={() => dispatch(closeDialog())}
            />
          </div>
          <div className={classes.headerContent}>
            <div className={classes.title}>
              <div>{art.title}</div>
              <small className={classes.subtitle}>
                {art.artistDisplayName}
                {art.artistNationality ? `, ${art.artistNationality}` : ''}
              </small>
            </div>
          </div>
        </ImageContent>
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          {renderDetailSection('Artwork Details', artworkDetails)}
          {renderDetailSection('Additional Details', additionalDetails)}
        </div>
      </DialogContent>
    </>
  );
}

const getArtworkDetails = (art: IArtObject): IListItem[] => [
  {
    title: 'Date',
    content: art.objectDate,
    tooltip:
      'Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created',
  },
  {
    title: 'Period',
    content: art.period,
    tooltip: 'Time or time period when an object was created',
  },
  {
    title: 'Dynasty',
    content: art.dynasty,
    tooltip:
      'Dynasty (a succession of rulers of the same line or family) under which an object was created',
  },
  {
    title: 'Culture',
    content: art.culture,
    tooltip:
      'Information about the culture, or people from which an object was created',
  },
  {
    title: 'Medium',
    content: art.medium,
    tooltip: 'Refers to the materials that were used to create the artwork',
  },
  {
    title: 'Accession Number',
    content: art.accessionNumber,
    tooltip: 'Identifying number for each artwork (not always unique)',
  },
  {
    title: 'Physical Type',
    content: art.objectName,
    tooltip: 'Describes the physical type of the object',
  },
  {
    title: 'Dimensions',
    content: art.dimensions,
    tooltip: 'Size of the artwork or object',
  },
];

const getAdditionalDetails = (art: IArtObject): IListItem[] => [
  {
    title: 'Department',
    content: art.department,
    tooltip: `Indicates The Met's curatorial department responsible for the artwork`,
  },
  {
    title: 'CreditLine',
    content: art.creditLine,
    tooltip:
      'Text acknowledging the source or origin of the artwork and the year the object was acquired by the museum',
  },
  {
    title: 'Repository',
    content: art.repository,
    tooltip: '',
  },
  {
    title: 'Gallery Number',
    content: art.GalleryNumber,
  },
  {
    title: 'Tags',
    content: art.tags && (
      <Grid container spacing={1}>
        {art.tags?.map((x) => (
          <Grid item key={x.term}>
            <Chip label={x.term} size='small' />
          </Grid>
        ))}
      </Grid>
    ),
  },
];
