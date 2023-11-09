import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Typography,
    Grid,
    Icon
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
    const [APIData, setAPIData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelSucDia, setOpenDelSucDia] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const getCakesUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';
    const deleteCakesUrl = `https://654c78cd77200d6ba858e32b.mockapi.io/cake`;

    useEffect(() => {
        loadCakes();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpenDelSucDia(false);
        loadCakes();
    };

    const deleteCake = () => {
        setOpen(false);
        axios.delete(deleteCakesUrl + `/${idDelete}`)
            .then(
                response => {
                    return response.data;
                })
            .then(data => setOpenDelSucDia(true))
            .catch(error => console.log(error.message));
    };

    const showConfirmDeleteDialog = (id) => {
        setIdDelete(id);
        setOpen(true);
    };

    const loadCakes = () => {
        axios.get(getCakesUrl).then(
            response => {
                return response.data;
            })
            .then(data => {
                data.sort((a, b) => a.id - b.id);
                setAPIData(data);
            })
            .catch(error => console.log(error.message));
    };

    return (
        <div>
            <h1 className="font-pages" style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Dashboard</h1>
            <div style={{textAlign: 'center'}}>
            <b>You want to add new Cake?</b>
            <Link to="/AddCake">
                <IconButton><Icon sx={{ color: blue[500] }}>add_circle</Icon></IconButton>
            </Link>
            </div>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {APIData.map((cake) => (
                    <Grid item xs={12} sm={6} md={4} key={cake.id}>
                        <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Avatar alt="Cake Image" src={cake.image} sx={{ width: 100, height: 100, margin: 'auto' }} />
                            <CardContent>
                                <Typography variant="h5" component="div" align="center" style={{ marginTop: '10px' }}>
                                    {cake.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Category: <b>{cake.category}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Price: <b>{cake.price}</b>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Description: {cake.description}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ justifyContent: 'center' }}>
                                <IconButton component={Link} to={`/UpdateCake/${cake.id}`} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={(e) => { showConfirmDeleteDialog(cake.id) }} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Cake"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1">
                            Are you sure to delete this cake?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteCake} color="error">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelSucDia}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1">
                            Delete Cake Successfully
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
