
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

export default function UpdateStudent() {
    const student = useParams();

    const [open, setOpen] = useState(false);

    const [APIData, setAPIData] = useState([]);
    const getStudentsUrl = `https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/studentManagement/${student.id}`;

    useEffect(() => {
        axios.get(getStudentsUrl).then(
            response => {

                return response.data;
            })
            .then(data => { setAPIData(data) })
            .catch(error => console.log(error.message));

    }, [getStudentsUrl])
    const handleClose = () => {
        setOpen(false);
    };
    const putStudentUrl = 'https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/studentManagement';


    const formik = useFormik({

        enableReinitialize: true,

        initialValues: APIData,



        // values : {APIData},

        onSubmit: (values) => {
            axios.put(`${putStudentUrl}/${student.id}`, values) 
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
            }}>Update Student</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <label htmlFor="name"><b>Name</b></label>
                    <TextField
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
                    <label htmlFor="dateofbirth"><b>Date of Birth</b></label>
                    <TextField
                        name="dateofbirth"
                        value={formik.values.dateofbirth}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.dateofbirth && (<Typography variant="caption" color="red">{formik.errors.dateofbirth}</Typography>)}
                    <label htmlFor="gender"><b>Gender</b></label>
                    <TextField
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.gender && (<Typography variant="caption" color="red">{formik.errors.gender}</Typography>)}
                    <label htmlFor="image"><b>Image</b></label>
                    <TextField
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.image && (<Typography variant="caption" color="red">{formik.errors.image}</Typography>)}
                    <label htmlFor="class"><b>Class</b></label>
                    <TextField
                        name="class"
                        value={formik.values.class}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.class && (<Typography variant="caption" color="red">{formik.errors.class}</Typography>)}
                    <label htmlFor="feedback"><b>Feedback</b></label>
                    <TextField
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