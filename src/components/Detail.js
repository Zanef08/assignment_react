import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid, CardMedia, Typography } from "@mui/material";

export default function Detail() {
    const { id } = useParams();
    const [APIData, setAPIData] = useState({});
    const getCakeUrl = `https://654c78cd77200d6ba858e32b.mockapi.io/cake/${id}`;

    useEffect(() => {
        fetch(getCakeUrl)
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
    }, [getCakeUrl]);

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
                            sx={{ width: '40%', height: '550px' }} 
                            image={APIData.image}
                            alt={APIData.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h3" component="div"> 
                                {APIData.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                            Category: <b>{APIData.category}</b>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Price: <b>{APIData.price}</b> 
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Description: {APIData.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
