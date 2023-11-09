
import { useFormik } from "formik";
import * as Yup from 'yup';
import { TextField, Button } from "@mui/material";
import * as React from 'react';
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function AddCake() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const postCakeUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            price: "",
            image: "",
            description: "",
        },

        onSubmit: (values) => {
            axios.post(postCakeUrl, values)
                .then(
                    response => {
                        return response.data;
                    })
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));

        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(3, "Must be more 2 characters"),
            category: Yup.string().required("Required.").typeError("Please enter category [Birthday Cake, Cookie, Cupcake]"),
            price: Yup.number().required("Required.").typeError("Please enter the price of the cake"),
            image: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            description: Yup.string().required("Required.").typeError("Please enter a valid string"),
        }),

    });


    return (
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Add new Cake
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} style={{ maxWidth: '400px', margin: 'auto' }}>
                    <Typography variant="caption" align="left" fontWeight="bold" marginBottom="0.2em">Name</Typography>
                    <TextField
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    {formik.errors.name && <Typography variant="caption" color="red">{formik.errors.name}</Typography>}

                    <Typography variant="caption" align="left" fontWeight="bold" marginBottom="0.2em">Category</Typography>
                    <Select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Select Category
                        </MenuItem>
                        <MenuItem value="Birthday Cake">Birthday Cake</MenuItem>
                        <MenuItem value="Cookie">Cookie</MenuItem>
                        <MenuItem value="Cupcake">Cupcake</MenuItem>
                    </Select>
                    {formik.errors.category && <Typography variant="caption" color="red">{formik.errors.category}</Typography>}

                    <Typography variant="caption" align="left" fontWeight="bold" marginBottom="0.2em">Price</Typography>
                    <TextField
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    {formik.errors.price && <Typography variant="caption" color="red">{formik.errors.price}</Typography>}

                    <Typography variant="caption" align="left" fontWeight="bold" marginBottom="0.2em">Image URL</Typography>
                    <TextField
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    {formik.errors.image && <Typography variant="caption" color="red">{formik.errors.image}</Typography>}

                    <Typography variant="caption" align="left" fontWeight="bold" marginBottom="0.2em">Description</Typography>
                    <TextField
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />
                    {formik.errors.description && <Typography variant="caption" color="red">{formik.errors.description}</Typography>}

                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                            backgroundColor: '#1976D2',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#135e96',
                            },
                        }}
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Adding successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component={Link} to='/dashboard' style={{ textDecoration: "none" }}>
                        Dashboard
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}