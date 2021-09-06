import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UseStyles from "./styles";
import Popup from '../AddUserPopup/Popup';
import EditPopup from "../EditUserPopup/EditPopup";

import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

const UsersDisplay = () => {
    const classes = UseStyles();

    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://equal.localhost/?get=model_collect&entity=core\\User&fields[]=firstname&fields[]=lastname&fields[]=groups_ids");
        setUser(result.data.reverse());
    };

    const deleteUser = (userId) => {
        axios.delete('http://equal.localhost/?do=model_delete&entity=core\\User&id=' + userId)
            .then(() => {
                loadUsers();
            })
            .catch(() => {
                alert('Error in the Code');
            });
    };

    return (
        <div className={classes.containerDiv}>
            <h2 className={classes.title}>CRUD Using React PHP eQual</h2>
            <Popup />
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Group ID</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.firstname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.lastname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.groups_ids}
                                </TableCell>
                                <TableCell align="right"><EditPopup /></TableCell>
                                <TableCell align="right"><DeleteIcon onClick={() => deleteUser(user.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UsersDisplay;