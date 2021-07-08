import React, { useEffect, useState } from "react";
import Modal from '@material-ui/core/Modal';
import UseStyles from './styles';
import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';

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
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });



    useEffect(() => {
        loadUser();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.put("http://equal.localhost/?do=model_update&entity=core\\User&ids[]=25&fields[firstname]=" + firstname + "&fields[lastname]=" + lastname + "&fields[login]=" + email + "&fields[password]=" + password);
        // history.push("/");
        window.location.reload();
    };

    const loadUser = async () => {
        const result = await axios.get("http://equal.localhost/?get=model_read&entity=core\\User&ids[]=25&fields[]=firstname&fields[]=lastname&fields[]=login&fields[]=password");
        console.log(result.data);
        setUser(result.data);
        // console.log(user);
    };

    const { firstname, lastname, email, password } = user;
    const handleFormChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log("Userr: " + firstname + lastname);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" className={classes.header}>Edit User Profile</h2>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item sm={5}>
                        <TextField
                            id="outlined-required"
                            label="First Name"
                            variant="outlined"
                            name="firstname"
                            onChange={handleFormChange}
                            value={firstname}
                        />
                        <TextField
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
                            id="outlined-required"
                            label="Last Name"
                            variant="outlined"
                            name="lastname"
                            onChange={handleFormChange}
                            value={lastname}
                        />
                        <TextField
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
                {/* ))} */}
                <Button type="submit" variant="outlined" style={{ marginLeft: "205px" }}>
                    Edit User
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <EditIcon onClick={handleOpen}>
                Edit User
            </EditIcon>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
            </Modal>
        </div>
    );
}