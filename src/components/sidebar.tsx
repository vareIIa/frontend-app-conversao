import React from 'react';
import { Box, Typography, Button, Drawer } from '@mui/material';

function Sidebar({ open, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          IPGC
        </Typography>
        {/* Itens do menu */}
        <Button sx={{ display: 'block', marginBottom: 2 }}>Suporte</Button>
        <Button sx={{ display: 'block', marginBottom: 2 }}>Configurações</Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
