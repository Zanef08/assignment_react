
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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function UpdateCake() {
    const cake = useParams();

    const [open, setOpen] = useState(false);

    const [APIData, setAPIData] = useState([]);
    const getCakesUrl = `https://654c78cd77200d6ba858e32b.mockapi.io/cake/${cake.id}`;

    useEffect(() => {
        axios.get(getCakesUrl).then(
            response => {

                return response.data;
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getCakesUrl])
    const handleClose = () => {
        setOpen(false);
    };
    const putCakeUrl = 'https://654c78cd77200d6ba858e32b.mockapi.io/cake';


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: APIData,
        onSubmit: (values) => {
            axios.put(`${putCakeUrl}/${cake.id}`, values)
                .then(
                    response => {
                        return response.data;
                    })
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(3, "Must be more 2 characters"),
            category: Yup.string().required("Required.").typeError("Please enter "),
            price: Yup.number().required("Required.").typeError("Please enter "),
            image: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            description: Yup.string().required("Required.").typeError("Please enter a valid string"),
        }),

    });
    const [currentCategory, setCurrentCategory] = useState(APIData.category || "");

    return (
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Update Cake
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
                        value={formik.values.category || ""}
                        onChange={formik.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
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
                            <AlertTitle>Updated successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>



        </div>


    )
}