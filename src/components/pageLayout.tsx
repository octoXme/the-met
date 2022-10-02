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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

interface IDefaultPageLayout extends Props {
  renderHeader: React.ReactElement;
  renderTopContent: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 11 : 0,
  });
}

/**
 * Manage the main page layout
 * @param {any} renderHeader page header - none scroll
 * @param {any} renderTopContent - on top of the content - in scroll
 * @param {any} renderContent - main content - in scroll
 */
const PageLayout = ({
  renderHeader,
  renderTopContent,
  ...props
}: IDefaultPageLayout) => {
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
        {renderTopContent && renderTopContent}
        <Box my={2}>{props.children}</Box>
      </Container>
    </React.Fragment>
  );
};

export default PageLayout;
