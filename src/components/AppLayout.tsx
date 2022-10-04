import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import { CloseIcon, MenuIcon } from './icons';
import IconButton from './iconButton';

const drawerWidth = 380;

interface IAppLayoutProp {
  sidebar: React.ReactElement;
  header: React.ReactElement;
  content: React.ReactElement;
}
export default function AppLayout({
  header,
  sidebar,
  content,
}: IAppLayoutProp) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color='inherit'
            icon={<CloseIcon />}
            title='close drawer'
            edge='end'
            onClick={closeDrawer}
            sx={{ display: { md: 'none' } }}
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: '1 1 auto', p: 2 }}>{sidebar}</Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            icon={<MenuIcon />}
            title='open drawer'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          />
          <Box sx={{ flex: '1 1 auto' }}>{header}</Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
