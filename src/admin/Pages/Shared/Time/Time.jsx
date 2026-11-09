import React from 'react';
import TextField from '@mui/material/TextField';
import '../../Appointments/Appointment.css';
import { Container } from '@mui/system';

const Time = ({ value, setValue }) => {
  const [val, setVal] = React.useState('10:00');

  return (
    <Container sx={{ p: 0 }}>
      <TextField
        type="time"
        fullWidth
        className="datetime"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          if (setValue) setValue(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
      />
    </Container>
  );
};

export default Time;
