import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, Divider, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NavLink } from "react-router-dom";

export default function TodaysDoctors() {
  const [doctors, setDoctors] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);
  return (
    <Grid
      container
      //   spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        margin: "2rem 0",
        padding: "3rem 1rem",
        background: "#fff",
        borderRadius: "0.5rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {doctors.slice(0,4).map((doctor) => (
        <NavLink
          key={doctor._id}
          to={"/addPatient/" + doctor.email}
          style={{
            textDecoration: "none",
            display: "flex",
            background: "#ccc",
            flexDirection: "row",
          }}
        >
          <Card elevation={3}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="160"
                image={doctor.image ? doctor.image : (doctor.gender === "female" ? "/doctors/doc2_farhana.jpg" : "/doctors/doc1_rafiqul.jpg")}
                alt={doctor.name}
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {doctor.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  SPECIALITY: {doctor.specialist ? doctor.specialist.toUpperCase() : ""}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  FEE: {doctor.fee ? doctor.fee : "Free"} TK
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  GENDER: {doctor.gender ? doctor.gender.toUpperCase() : ""}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#999",
              }}
            >
              <AccessTimeIcon sx={{ mr: 2 }} />
              <Typography> {doctor.time}</Typography>
            </CardActions>
          </Card>
        </NavLink>
      ))}
    </Grid>
  );
}
