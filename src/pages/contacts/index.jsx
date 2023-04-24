import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

const Contacts = () => {
const theme = useTheme();
const colors = theme.palette.mode;

const handleEdit = (row) => {
// Adicione aqui a lógica para editar um contato
};

const handleDelete = (id) => {
// Adicione aqui a lógica para excluir um contato
};

return (
<Box m="20px">
<Header title="CONTACTS" subtitle="welcome to your Contacts" />
<Box
m="8px 0 0 0"
width="100%"
height="80vh"
sx={{
"& .MuiDataGrid-root, & .MuiDataGrid-cell": {
border: "none",
},
"& .name-column--cell": {
color: colors.primary,
},
"& .MuiDataGrid-columnHeaders": {
backgroundColor: colors.blueAccent[700],
borderBottom: "none",
},
"& .MuiDataGrid-virtualScroller": {
backgroundColor: colors.primary[400],
},
"& .MuiDataGrid-footerContainer": {
borderTop: "none",
backgroundColor: colors.blueAccent[700],
},
"& .MuiCheckbox-root": {
color: colors.greenAccent[200],
},
"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
color: colors.grey[100],
},
}}
>
<DataGrid
rows={mockDataContacts}
columns={[
{ field: "id", headerName: "Id", width: 100 },
{ field: "registrarId", headerName: "Registrar Id", width: 100 },
{
field: "name",
headerName: "Name",
cellClassName: "name-column--cell",
width: 200,
},
{
field: "age",
headerName: "Age",
type: "number",
headerAlign: "left",
align: "left",
width: 100,
},
{ field: "phone", headerName: "Phone Number", width: 100 },
{ field: "email", headerName: "Email", width: 200 },
{ field: "address", headerName: "Address", width: 250 },
{ field: "city", headerName: "City", width: 100 },
{ field: "zipCode", headerName: "Zip Code", width: 100 },
{
field: "edit",
headerName: "Edit",
sortable: false,
width: 100,
renderCell: (params) => (
<IconButton onClick={() => handleEdit(params.row)}>
<EditIcon />
</IconButton>
),
},
{
field: "delete",
headerName: "Delete",
sortable: false,
width: 100,
renderCell: (params) => (
<IconButton onClick={() => handleDelete(params.row.id)}>
<DeleteIcon />
</IconButton>
),
},
]}
components={{ Toolbar: GridToolbar }}
/>
</Box>
</Box>
);
};

export default Contacts;