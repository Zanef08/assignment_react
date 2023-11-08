import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid, CardMedia, Typography } from "@mui/material";

export default function Detail() {
    const { id } = useParams();
    const [APIData, setAPIData] = useState({});
    const getStudentUrl = `https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/studentManagement/${id}`;

    useEffect(() => {
        fetch(getStudentUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAPIData(data);
            })
            .catch((error) => console.log(error.message));
    }, [getStudentUrl]);

    return (
        <div>
            <h1 style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Detail</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '40%', height: 'auto' }} 
                            image={APIData.image}
                            alt={APIData.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h3" component="div"> 
                                {APIData.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                            Date of Birth: {APIData.dateofbirth}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Gender: {APIData.gender ? "Male" : "Female"}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Class: {APIData.class}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                            Feedback: {APIData.feedback}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
