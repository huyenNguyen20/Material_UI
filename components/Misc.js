import {
    Grid,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useStyles = makeStyles({
    

})


export function Misc () {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [totalUser, setTotalUser] = useState('0')
    const getTotalUser = () => {
        axios.get("http://localhost:8080")
        .then(response => {
            setTotalUser(response.data.users);
        })
        .catch(err => {
            console.log("Error --- ", err);
        })
    }
    useEffect(() => {
        let isMounted = true;
        getTotalUser();
        return () => {
            isMounted = false;
        }
    }, []);
    return(
        <Grid container justify="center">
            <Grid item sm></Grid>
            <Grid item container sm>
                <Grid item>
                    <Typography variant="h1" className={classes.title}>Join Us</Typography>
                    <Typography variant="body1">{`Join our ${totalUser} users`}</Typography>
                </Grid>
            </Grid>
            <Grid item sm></Grid>
        </Grid>
    )
}
