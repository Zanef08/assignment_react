
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

export default function AddStaff() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const postStudentUrl = 'https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/studentManagement';

    const formik = useFormik({
        initialValues: {
            name: "",
            dateofbirth: "",
            gender: "",
            image: "",
            class: "",
            feedback: ""
        },

        onSubmit: (values) => {
            values.createdAt = new Date(values.createdAt);
            axios.post(postStudentUrl, values)
                .then(
                    response => {
                        return response.data;
                    })
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));

        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(3, "Must be more 2 characters"),
            dateofbirth: Yup.string().required("Required.").typeError("Please enter Birthday of Student"),
            gender: Yup.boolean().required("Required.").typeError("Please enter True (Male) or False (Female)"),
            image: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            class: Yup.string().required("Required.").typeError("Please enter a valid string"),
            feedback: Yup.string().typeError("Please enter a valid string"),
        }),

    });


    return (
        <div>
            <h1 className="font-pages" style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Add new Student</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
                    <TextField
                        label="dateofbirth"
                        name="dateofbirth"
                        value={formik.values.dateofbirth}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.dateofbirth && (<Typography variant="caption" color="red">{formik.errors.dateofbirth}</Typography>)}
                    <TextField
                        label="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.gender && (<Typography variant="caption" color="red">{formik.errors.gender}</Typography>)}

                    <TextField
                        label="image"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.image && (<Typography variant="caption" color="red">{formik.errors.image}</Typography>)}

                    <TextField
                        label="class"
                        name="class"
                        value={formik.values.class}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.class && (<Typography variant="caption" color="red">{formik.errors.class}</Typography>)}
                    <TextField
                        label="feedback"
                        name="feedback"
                        value={formik.values.feedback}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.feedback && (<Typography variant="caption" color="red">{formik.errors.feedback}</Typography>)}

                </Stack>

                <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    sx={{
                        backgroundColor: '#1976D2',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#135e96', 
                        },
                    }}
                    style={{
                        marginTop: "10px"
                    }}
                >
                    Save
                </Button>

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
                    <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}