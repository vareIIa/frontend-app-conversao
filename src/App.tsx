import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  AppBar,
  Toolbar

} from '@mui/material';

import './App.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [uploadedImages] = useState<File[]>([]);



  const FILESERVER_UPLOAD_DOCX = 'http://147.79.111.214:5000/upload-docx'; // Rota de upload
  const FILESERVER_CONFIRM = 'http://147.79.111.214:5000/processar-cursos'; // Rota de confirmação
  const FILESERVER_UPLOAD_PDF = 'http://147.79.111.214:5000/upload-pdf'; // Rota de upload
  const FILESERVER_UPLOAD_IMAGES = 'http://147.79.111.214:5000/upload-images'; // Rota de upload


  const handleFileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('png_file', file);
    });

    setLoading(true);
    try {
      const response = await fetch(FILESERVER_UPLOAD_IMAGES, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Arquivos enviados com sucesso!');
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

  const handleFileDocx = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('docx_file', file);
    });

    setLoading(true);
    try {
      const response = await fetch(FILESERVER_UPLOAD_DOCX, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Arquivos enviados com sucesso!');
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

  const handleFilePdf = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('pdf_file', file);
    });

    setLoading(true);
    try {
      const response = await fetch(FILESERVER_UPLOAD_PDF, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Arquivos enviados com sucesso!');
      } else {
        alert('Erro ao enviar arquivos!');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro no upload!');
    }
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch(FILESERVER_CONFIRM, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Arquivos processados com sucesso!');
      } else {
        alert('Erro ao processar arquivos!');
      }
    } catch (error) {
      console.error('Erro ao processar:', error);
      alert('Erro ao processar!');
    }
    setLoading(false);
  };

  return (
    <Box
  sx={{
    
    minHeight: "100vh",
    width: "100vw", 
     
  }}
>
      <AppBar position="static">
        <Toolbar>
         
            
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
            CONTROLE DE POSTAGENS 
          </Typography>
        </Toolbar>
      </AppBar>

      

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '50vw',
            height: 'auto',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            overflowY: 'auto',
          }}
        >
          <Box sx={{marginTop: '50px',display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
          <Paper sx={{ padding: '20px', marginBottom: '20px', maxWidth: '20vw'}}>
          <Typography variant="h6" gutterBottom>
            Enviar <strong>DOCX</strong>
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
              accept=".docx"
              multiple
              hidden
              onChange={handleFileDocx}
            />
          </Button>
          </Paper>
          
          <Paper sx={{ padding: '20px', marginBottom: '20px', maxWidth: '20vw'}}>
          <Typography variant="h6" gutterBottom>
            Enviar <strong>PDF</strong>
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
              accept=".pdf"
              multiple
              hidden
              onChange={handleFilePdf}
            />
          </Button>
          </Paper>
          </Box>
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        padding: 0,
        margin: 0,
      }}
    >




      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          
        }}
      >

         
        <Paper sx={{padding: '20px', marginBottom: '20px', maxWidth: '25.5vw', width: '100%'}}>
          <Typography variant="h6" gutterBottom>
            Enviar Imagens
          </Typography>
          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{ marginBottom: '20px' }}
          >
            Selecionar Imagens
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileImage}
            />
          </Button>
          
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              Imagens Enviadas
            </Typography>
            {uploadedImages.length > 0 ? (
              <Grid container spacing={2}>
                {uploadedImages.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        padding: '10px',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                        
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded Preview ${index}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '200px',
                        }}
                      />
                      <Typography variant="body2" noWrap sx={{ marginTop: '10px' }}>
                        {image.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Nenhuma imagem enviada.
              </Typography>
            )}
          </Box>
          </Paper>
          
        

        {loading ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            
            <CircularProgress />
          </Box>
        ) : (

          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '30vw', width: '100%', marginTop: '20px'}}>
            <Paper sx={{ padding: '30px', marginBottom: '20px', maxWidth: '25.5vw', width: '100%'}}>
          <Typography>Caso tenha <strong>SELECIONADO</strong> todos os arquivos necessários para a criação do curso <strong>IMAGENS, PDF E DOCX</strong> <br></br><br></br> Clique em <strong>CONFIRMAR</strong> e aguarde a confirmação da postagem.</Typography>
          <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ marginTop: 3 }}>
            Confirmar
          </Button>
          </Paper>
          </Box>
        )}
      </Box>
      
    </Box>
  
          

          


          

          
        </Paper>
      </Box>
    </Box>
  );
}

export default App;


