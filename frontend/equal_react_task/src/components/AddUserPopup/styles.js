import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    header: {
        textAlign: "center"
    },
    addUser: {
        float: "right"
    },
    formControl: {
        margin: theme.spacing(1.3),
        minWidth: 120,
        width: '25ch'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default UseStyles;