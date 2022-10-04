import {
  useScrollTrigger,
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  Box,
} from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactElement;
}

interface IDefaultPageLayout extends Props {
  renderHeader: React.ReactElement;
  renderTopContent: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 11 : 0,
  });
}

export default function PageLayout({
  renderHeader,
  renderTopContent,
  ...props
}: IDefaultPageLayout) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>{renderHeader}</Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        {renderTopContent}
        <Box my={2}>{props.children}</Box>
      </Container>
    </React.Fragment>
  );
}
