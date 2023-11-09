import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { Paper, TableContainer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Dashboard() {

    const [APIData, setAPIData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelSucDia, setOpenDelSucDia] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const getCakesUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';
    const deleteCakesUrl = `https://654c78cd77200d6ba858e32b.mockapi.io/cake`;

    useEffect(() => {
        loadCakes();
    }, [])

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((cake) => (
                            <TableRow
                                key={cake.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {cake.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {cake.name}
                                </TableCell>
                                <TableCell align="left">{cake.category}</TableCell>
                                <TableCell align="right">

                                    <Avatar align="left" alt="Remy Sharp" src={cake.image} />

                                </TableCell>
                                <TableCell align="left">{cake.price}</TableCell>
                                <TableCell align="left">{cake.description}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={3}>
                                        <Link to="/AddCake">
                                            <IconButton><Icon sx={{ color: blue[500] }}>add_circle</Icon></IconButton>
                                        </Link>
                                        <Link to={`/UpdateCake/${cake.id}`}>
                                            <IconButton><Icon sx={{ color: blue[500] }}>update_circle</Icon></IconButton>
                                        </Link>

                                        <IconButton onClick={(e) => { showConfirmDeleteDialog(cake.id) }}><Icon sx={{ color: blue[500] }}>delete_circle</Icon></IconButton>


                                    </Stack>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                        <Alert severity="warning">
                            <AlertTitle>Are you sure to delete this cake ?</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteCake}>Yes</Button>
                    <Button autoFocus onClick={handleClose}>
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
                        <Alert severity="success">
                            <AlertTitle>Delete Cake Successfully</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>OK</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}