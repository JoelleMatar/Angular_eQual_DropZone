import React, { useEffect, useState } from "react";
import Modal from '@material-ui/core/Modal';
import UseStyles from './styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import axios from "axios";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function Popup() {
    const classes = UseStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    };

    const [form, setForm] = useState(initialState);

    const { firstname, lastname, email, password } = form;

    const handleFormChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form);

        await axios.post("http://equal.localhost/?do=model_create&entity=core\\User&fields[firstname]=" + form.firstname + "&fields[lastname]=" + form.lastname + " &fields[email]=" + form.email + "&fields[password]=" + form.password + "")
            .then(() => {
                alert("User added");
                window.location.reload();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" className={classes.header}>Insert New User</h2>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item sm={5}>
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            variant="outlined"
                            name="firstname"
                            onChange={handleFormChange}
                            value={firstname}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            variant="outlined"
                            name="email"
                            type="email"
                            onChange={handleFormChange}
                            value={email}
                        />
                    </Grid>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={5}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Last Name"
                            variant="outlined"
                            name="lastname"
                            onChange={handleFormChange}
                            value={lastname}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            onChange={handleFormChange}
                            value={password}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="outlined" style={{ marginLeft: "205px" }}>
                    Add User
                </Button>

            </form>
        </div>
    );

    return (
        <div>
            <Button variant="outlined" className={classes.addUser} onClick={handleOpen}>
                Add User
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}