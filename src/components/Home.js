import { CardMedia, Card, CardContent, CardActions, Typography, Button, Grid, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [APIData, setAPIData] = useState([]);
    const getCakesUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';

    useEffect(() => {
        fetch(getCakesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                data.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
                setAPIData(data);
            })
            .catch(error => console.log(error.message));
    }, []);

    return (
        <Container>
        <div>
            <h1 className="font-pages" style={{ fontSize: "40px", textAlign: "center", marginTop: "11%" }}>Our Cakes</h1>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {APIData.map((cake) => (
                    <Grid item xs={12} sm={6} md={4} key={cake.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                            <CardMedia
                                component="img"
                                height="350"
                                image={cake.image}
                                alt={cake.name}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" component="div" mb={1}>
                                    <Link to={`detail/${cake.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        {cake.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    Category: <b>{cake.category}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: <b>${cake.price}</b>
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <Link to={`detail/${cake.id}`} style={{ textDecoration: 'none' }}>
                                    <Button size="small" sx={{color: '#DB7093'}}>
                                        <b>Info</b>
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
        </Container>
    );
};

export default Home;
