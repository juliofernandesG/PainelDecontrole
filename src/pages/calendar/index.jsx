import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import Grid from "@mui/material/Grid";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  const handleDateClick = (selected) => {
    setEditingEvent(null);
    setEventTitle("");
    setDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventTitle(event.title);
    setDialogOpen(true);
  };

  const handleEventClick = (selected) => {
    setEditingEvent(selected.event);
    setEventTitle(selected.event.title);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEventTitle("");
  };

  const handleSaveEvents = () => {
    fetch("http://localhost:4000/agenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentEvents),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: `${new Date().getTime()}`,
      title: eventTitle,
      start: editingEvent ? editingEvent.start : null,
      end: editingEvent ? editingEvent.end : null,
      allDay: editingEvent ? editingEvent.allDay : null,
    };

    if (editingEvent) {
      const updatedEvents = currentEvents.map((event) => {
        if (event.id === editingEvent.id) {
          return newEvent;
        } else {
          return event;
        }
      });
      setCurrentEvents(updatedEvents);
    } else {
      setCurrentEvents([...currentEvents, newEvent]);
    }

    setDialogOpen(false);
    setEditingEvent(null);
    setEventTitle("");
  };

  const handleDeleteEvent = () => {
    const updatedEvents = currentEvents.filter(
      (event) => event.id !== editingEvent.id
    );
    setCurrentEvents(updatedEvents);

    setDialogOpen(false);
    setEditingEvent(null);
    setEventTitle("");
  };

  return (
    <Box m="20px">
      <Header title="Calendario" subtitle="Adicione sua agenda!" />
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Box
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Compromissos</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor:
colors.secondary[200],
borderRadius: "4px",
marginBottom: "8px",
}}
secondaryAction={
<>
<IconButton
edge="end"
onClick={() => handleEditEvent(event)}
>
<EditIcon />
</IconButton>
<IconButton
edge="end"
onClick={() => {
setEditingEvent(event);
handleDeleteEvent();
}}
>
<DeleteIcon />
</IconButton>
</>
}
>
<ListItemText
primary={event.title}
secondary={formatDate(
event.start,
{
year: "numeric",
month: "numeric",
day: "numeric",
hour: "numeric",
minute: "numeric",
},
{ timeZone: "UTC" }
)}
/>
</ListItem>
))}
</List>
<Box display="flex" justifyContent="flex-end">
<Button
             variant="contained"
             color="primary"
             onClick={handleSaveEvents}
           >
Salvar
</Button>
</Box>
</Box>
</Grid>
<Grid xs={12} md={8}>
<FullCalendar
plugins={[
dayGridPlugin,
timeGridPlugin,
interactionPlugin,
listPlugin,
]}
initialView="dayGridMonth"
events={currentEvents}
headerToolbar={{
start: "prev,next today",
center: "title",
end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
}}
editable={true}
selectable={true}
selectMirror={true}
dayMaxEvents={true}
weekends={true}
initialEvents={[]}
dateClick={handleDateClick}
eventClick={handleEventClick}
/>
</Grid>
      </Grid>
  {dialogOpen && (
    <Box
      sx={{
        backgroundColor: colors.secondary[100],
        borderRadius: "4px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
      }}
    >
      <Typography variant="h5">
        {editingEvent ? "Editar Compromisso" : "Adicionar Compromisso"}
      </Typography>
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        sx={{ margin: "10px 0" }}
      />
      {editingEvent && (
        <Typography variant="subtitle1" sx={{ margin: "10px 0" }}>
          {`Evento atual: ${editingEvent.title}`}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEvent}
        disabled={!eventTitle}
      >
        {editingEvent ? "Salvar Alterações" : "Adicionar"}
      </Button>
      {editingEvent && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteEvent}
          sx={{ marginLeft: "10px" }}
        >
          Deletar
        </Button>
      )}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleDialogClose}
        sx={{ marginLeft: "10px" }}
      >
        Cancelar
      </Button>
    </Box>
  )}
</Box>
);
};

export default Calendar;