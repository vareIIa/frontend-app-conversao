import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const FILESERVER_UPLOAD_URL = 'http://localhost:5000/upload-docx'; // Rota de upload

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('docx_file', file);
    });

    setLoading(true);
    try {
      const response = await fetch(FILESERVER_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Arquivos enviados com sucesso!');
        // Aqui você pode buscar a lista de arquivos, caso queira exibir.
        // fetchFiles();
      } else {
        alert('Erro ao enviar arquivos!');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro no upload!');
    }
    setLoading(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', width: '85vw' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CONTROLE DE POSTAGENS
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <SideBarContent toggleDrawer={toggleDrawer} />
      </Drawer>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '50vw',
            maxHeight: '50vh',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enviar Arquivos
          </Typography>
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{ marginBottom: '20px' }}
          >
            Selecionar Arquivos
            <input
              type="file"
              accept=".pdf,.docx"
              multiple
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" gutterBottom>
                Arquivos Disponíveis
              </Typography>
              {uploadedFiles.length > 0 ? (
                <div>
                  {uploadedFiles.map((file: any, index: number) => (
                    <Paper key={index} sx={{ padding: '10px', marginBottom: '10px' }}>
                      <Typography variant="body1" noWrap>
                        {file.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={file.url}
                        target="_blank"
                        sx={{ marginTop: '10px' }}
                      >
                        Abrir
                      </Button>
                    </Paper>
                  ))}
                </div>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Nenhum arquivo disponível.
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

const SideBarContent = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        IPGC
      </Typography>
      <Button sx={{ display: 'block', marginBottom: 2 }}>Suporte</Button>
    </Box>
  );
};

export default App;
