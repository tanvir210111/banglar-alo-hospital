import React from 'react';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import '../../Appointments/Appointment.css';

const Calender = ({ value, setValue }) => {
  const dateVal = value ? new Date(value).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  return (
    <Container sx={{ p: 0 }}>
      <TextField
        type="date"
        fullWidth
        className="datetime"
        value={dateVal}
        onChange={(e) => {
          if (setValue) setValue(new Date(e.target.value));
        }}
        InputLabelProps={{ shrink: true }}
      />
    </Container>
  );
};

export default Calender;
