import {
    Grid,
    Typography,
    Button,
    useTheme,
    useMediaQuery,
    TextField,
    Dialog,
    DialogContent,
    CircularProgress,
    DialogTitle,
    Snackbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowForward } from '@material-ui/icons';
import React, {useState} from 'react';
import Background from '../assets/background.jpg';
import Phone from '../assets/phone.svg';
import Envelop from '../assets/email.svg';
import Send from '../assets/send.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles( theme => ({
    container: {
        margin: '30px 0'
    },
    estimateContainer: {
        backgroundImage: `linear-gradient(to bottom, rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
            url(${Background})`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    },
    icon: {
        fontSize: '1.2rem',
        verticalAlign: 'bottom',
        marginRight: 10
    },
    airplaneIcon: {
        display: 'block',
        marginLeft: '10px',
    },
    estimate: {
        ...theme.typography.estimate,
        borderRadius: '20px',
        fontSize: "1.2rem",
        [theme.breakpoints.down("md")] : {
            fontSize: '1rem',
        },
        maxWidth: 200,
        marginTop: 20
    },
    textArea: {
        border: `2px solid ${theme.palette.common.blue}`,
        marginTop: 50,
        borderRadius: '5px',
        padding: 10
    },
    subtitle: {
        marginBottom: 20
    },
    btn: {
        borderRadius: '20px',
        fontSize: "0.8rem",
    },
    dialog: {
        marginTop: 80,
        minWidth: '300px',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')] : {
            padding: '10px 0px'
        },
    }
}))

export function ContactUs (props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [alert, setAlert] = useState({open: false, message:"", backgroundColor: ""})
    const handleChange = (e) => {
        const value = e.target.value;
        switch(e.target.id){
            case 'name': 
                setName(value);
                if(!Boolean(value)) setNameError("Name is Required");
                else setNameError("");
                break;
            case 'email':
                setEmail(value);
                if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) 
                    setEmailError("Invalid Email Address");
                else setEmailError("");
                break;
            case 'phone':
                setPhone(value);
                if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value))
                    setPhoneError(value);
                else setPhoneError("");
                break;
            case 'message':
                setMessage(value);
                if(!Boolean(value)) setMessageError(value);
                else setMessageError("");
                break;
            default:
                break;
        }
    }
    const onConfirm = () => {
        setIsLoading(true);
        axios.get("https://us-central1-expensify-test-7ff23.cloudfunctions.net/sendMail", {
            params: {
                name,
                email,
                phone,
                message
            }
        })
        .then(response => {
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setIsLoading(false);
            setAlert({open: true, backgroundColor: 'green', message: 'Message sent successfully'})
            console.log("Success!")
        })
        .catch(err => {
            setAlert({open: true, backgroundColor: 'red', message: 'Something went wrong. Try again.'})
            console.log("Error!")
        })
    }
    const ButtonContent = (
        <React.Fragment>
            Send Message 
            <span className={classes.airplaneIcon} >
                <img src={Send} alt="Paper Airplane" />
            </span>
        </React.Fragment>
    )
    const dialog = (
        <Dialog open={open} 
        onClose={() => setOpen(false)} 
        classes={{paper: classes.dialog}}
        fullScreen={matchesSM? true : undefined}
        >
            <DialogTitle style={{
                color: theme.palette.common.blue, 
                margin: matchesSM ? '20px auto' : '0 auto', 
                fontSize: '2rem'}}>
               Confirm Message
            </DialogTitle>
            <DialogContent>
            <Grid item container direction="column" style={{width: '100%'}}>
                    <Grid item container direction="column" alignItems="center">
                        <Grid item>
                            <TextField
                            id="name"
                            label="Name"
                            value={name}
                            error={Boolean(nameError)}
                            helperText={nameError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            id="email"
                            label="Email"
                            value={email}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            id="phone"
                            label="Phone"
                            value={phone}
                            error={Boolean(phoneError)}
                            helperText={phoneError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center">
                        <TextField
                             InputProps={{disableUnderline: true}}
                             id="message"
                             value={message}
                             error={Boolean(messageError)}
                             helperText={messageError}
                             onChange={e => { handleChange(e); }}
                             multiline
                             rows="10"
                             className={classes.textArea}
                             placeholder="Your message goes here"
                        />
                        
                    </Grid>
                    <Grid item container justify="center">
                        <Button 
                        disabled={
                            name === '' || nameError ||
                            email === '' || emailError ||
                            phone === '' || phoneError ||
                            message === '' || messageError
                        }
                        variant="contained" 
                        color="secondary" 
                        className={classes.estimate}
                        onClick={() => {onConfirm();}}>
                           {isLoading? <CircularProgress/> : ButtonContent}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            
        </Dialog>
    );

    
    return(
        <Grid container >
            <Snackbar open={alert.open} message={alert.message} 
            ContentProps={{style: {backgroundColor: alert.backgroundColor}}} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => setAlert({...alert, open: false})} 
            autoHideDuration={4000} />
            <Grid item container className={classes.container} 
            justify="center" lg={3} md={4} sm={6} xs={12} >
                <Grid item container direction="column" style={{width: '80%'}}>
                    <Grid item>
                        <Typography variant="h4" align="center">Contact Us</Typography>
                        <Typography variant="subtitle1"
                        style={{color: theme.palette.common.blue}}
                        align="center">
                            We are waiting!
                        </Typography>
                    </Grid>
                    <Grid item container justify="center">
                        <Grid item className={classes.icon}>
                            <img src={Phone} alt="Phone" />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2"
                             style={{color: theme.palette.common.blue}}>
                            (555)-555-5555
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container justify="center">
                        <Grid item className={classes.icon}>
                            <img src={Envelop} alt="Envelop"  />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2"
                             style={{color: theme.palette.common.blue}}>
                            example@abc.com
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" alignItems="center">
                        <Grid item>
                            <TextField
                            id="name"
                            label="Name"
                            value={name}
                            error={Boolean(nameError)}
                            helperText={nameError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            id="email"
                            label="Email"
                            value={email}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            id="phone"
                            label="Phone"
                            value={phone}
                            error={Boolean(phoneError)}
                            helperText={phoneError}
                            onChange={e => { handleChange(e); }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justify="center">
                        <TextField
                             InputProps={{disableUnderline: true}}
                             id="message"
                             value={message}
                             error={Boolean(messageError)}
                             helperText={messageError}
                             onChange={e => { handleChange(e); }}
                             multiline
                             rows="10"
                             className={classes.textArea}
                             placeholder="Your message goes here"
                        />
                        
                    </Grid>
                    <Grid item container justify="center">
                        <Button 
                        disabled={
                            name === '' || nameError ||
                            email === '' || emailError ||
                            phone === '' || phoneError ||
                            message === '' || messageError
                        }
                        variant="contained" 
                        color="secondary" 
                        className={classes.estimate}
                        onClick={() => setOpen(true)}>
                            {ButtonContent}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container className={classes.estimateContainer} lg={9} md={8} sm={6} xs={12}>
            <Grid container
                className={classes.contentContainer}
                alignItems="center"
                direction="row">
                    <Grid item container 
                    justify="space-between" 
                    direction={matchesSM? 'column':'row'}
                    >
                        <Grid item style={matchesSM ? 
                            {margin: "0 auto", textAlign: "center"} 
                            : {marginLeft: 50}}>
                            <Typography variant="h4" 
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem", color: '#fff'}}> 
                            Simple Software. <br />
                            Revolutionary Results.
                            </Typography>
                            <Typography 
                            variant="subtitle2" 
                            className={classes.subtitle}
                            style={{color: '#fff'}}>
                                Take advantage of the 21st Century
                            </Typography>
                            <Button 
                            variant="outlined"
                            className={classes.btn}
                            style={{color: '#fff', border: '0.5px solid #fff'}}
                            component={Link}
                            to="/estimate"
                            onClick={() => props.setValue(5)}
                            >
                                Learn More
                                <ArrowForward/>
                            </Button>
                        </Grid>
                        <Grid item style={matchesSM ? 
                            {margin: "50px auto", textAlign: "center",} 
                            : {marginRight: 50, textAlign: "right"}}>
                            <Button 
                            variant="contained" 
                            className={classes.estimate}
                            color="secondary"
                            component={Link}
                            to="/estimate"
                            onClick={() => {props.setValue(5)}}
                            >
                                Free Estimate
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {dialog}
        </Grid>
    );
}