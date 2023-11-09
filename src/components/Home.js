import { CardMedia, Paper, TableContainer } from "@mui/material";
import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";


export default function Home() {

    const [APIData, setAPIData] = useState([]);
    const getCakesUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';

    useEffect(() => {
        fetch(getCakesUrl).then(
            response => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                data.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
                setAPIData(data)
            })
            .catch(error => console.log(error.message));

    }, [])


    return (
        <div>
            <h1 className="font-pages" style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Our Cakes</h1>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {APIData.map((cake) => (
                    <Grid item xs={12} sm={6} md={4} key={cake.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={cake.image}
                                title="green iguana"
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h5" component="div">
                                    <Link to={`detail/${cake.id}`} style={{ textDecoration: 'none', color: '#1976D2' }}>
                                        {cake.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: <b>{cake.category}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price:<b> {cake.price}</b>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`detail/${cake.id}`} style={{ textDecoration: 'none' }}>
                                    <Button size="small" variant="outlined" color="primary">
                                        Info
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}