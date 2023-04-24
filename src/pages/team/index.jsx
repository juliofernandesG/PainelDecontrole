import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";

function Team() {
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? theme.palette.grey : theme.palette;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    access: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envia os dados do formulário para o servidor JSON-Serve
      await fetch("http://localhost:4000/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Recupera o conteúdo atualizado do banco de dados
      const response = await fetch("http://localhost:4000/time");
      const data = await response.json();
  
      // Atualiza o estado da aplicação com o novo conteúdo do banco de dados
      setMockDataTeam(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="welcome to your Team" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.green[600],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blue[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blue[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.green[200]} !important`,
          },
        }}
      >
        <DataGrid rows={setMockDataTeam} columns={columns} />
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          marginTop: "16px",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" sx={{ marginBottom: "16px" }}>
          Adicionar Membro
        </Typography>
        <TextField label="Nome" name="name" value={formData.name} onChange={handleInputChange} />
        <TextField label="Idade" name="age" type="number" value={formData.age} onChange={handleInputChange} />
        <TextField label="Telefone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
        <TextField label="Nível de Acesso" name="access" value={formData.access} onChange={handleInputChange} />
        <Button variant="contained" type="submit">Adicionar</Button>
      </Box>
    </Box>
  );
}

export default Team;
