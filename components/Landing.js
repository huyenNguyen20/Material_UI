import {
    Grid,
    Typography,
    Button,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import animationData from '../animations/landinganimation/data';
import Lottie from 'react-lottie';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import customSoftwareIcon from '../assets/Custom Software Icon.svg';
import mobileIcon from '../assets/mobileIcon.svg';
import webIcon from '../assets/websiteIcon.svg';
import revolutionBackground from '../assets/repeatingBackground.svg';
import contactUsBackground from '../assets/infoBackground.svg';
import callToActionBackground from '../assets/background.jpg';

const useStyles = makeStyles(theme => ({
    animation: {
        marginTop: 30,
        [theme.breakpoints.down("sm")] : {
            width: '100%'
        }
    },
    hero: {
        margin: '0 auto',
        padding: 20,
    },
    btnHero: {
        borderRadius: '20px',
        fontSize: "1.2rem",
        marginLeft: 20,
        [theme.breakpoints.down("md")] : {
            fontSize: '1rem',
        },
        [theme.breakpoints.down("xs")] : {
            marginTop: 20,
            marginLeft: 0,
            fontSize: '0.7rem',
        },
        maxWidth: 200
    },
    btn: {
        borderRadius: '20px',
        fontSize: "0.8rem",
    },
    estimate: {
        ...theme.typography.estimate,
        borderRadius: '20px',
        fontSize: "1.2rem",
        [theme.breakpoints.down("md")] : {
            fontSize: '1rem',
        },
        maxWidth: 200
    },
    buttonGroup: {
        marginTop: 20
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: '3rem',
        fontWeight: '600',
        color: theme.palette.common.blue,
        [theme.breakpoints.down("md")] : {
            fontSize: '2rem',
        },
        [theme.breakpoints.down("sm")] : {
            fontSize: '1.5rem',
        }
    },
    subtitle: {
        marginBottom: 20
    },
    specialText: {
        fontFamily: "Pacifico",
        color: theme.palette.common.orange
    },
    serviceContainer: {
        marginTop: '100px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 50px'
        }
    },
    serviceIcon: {
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '50px'
        }
    },
    contentContainer: {
        height: '100vh'
    },
    card: {
        textAlign: 'center',
        position: 'absolute',
        height: '40%',
        padding: '60px 50px 0 50px ',
        boxShadow: theme.shadows[6],
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    cardTitle: {
        fontFamily: 'Pacifico',
        fontWeight: 300
    },
    revolutionBackgroundImage: {
        backgroundImage: `url(${revolutionBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%'
    },
    contactUsBackgroundImage: {
        backgroundImage: `url(${contactUsBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%'
    },
    callToActionBackgroundImage: {
        backgroundImage: `url(${callToActionBackground})`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%'
    }
}))

export function Landing(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const [isStopped, setIsStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    

    return (
        <Grid container direction="column">
            <Grid item>
                {/*----Hero Block-----*/}
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Grid item className={classes.hero}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography className={classes.title} align="center">
                                    Bring West Coast  <br/>
                                    Technology to the Mid West
                                </Typography>
                            </Grid>
                            <Grid item container 
                            direction={matchesXS? "column":"row"}
                            justify={matchesXS? "center": undefined}
                            alignItems={matchesXS? "center": undefined}
                            className={classes.buttonGroup}>
                                <Button 
                                variant="contained" 
                                className={classes.estimate}
                                color="secondary"
                                component={Link}
                                to="/estimate"
                                onClick={() => props.setValue(5)}
                                >
                                    Free Estimate
                                </Button>
                                <Button 
                                variant="outlined"
                                className={classes.btnHero}
                                color="primary"
                                component={Link}
                                to="/services"
                                onClick={() => props.setValue(1)}
                                >
                                    Learn More
                                    <ArrowForward/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.animation}>
                        <Lottie 
                        options={defaultOptions}
                        height={matchesSM? 200: 400}
                        width={matchesSM? 200: 400}
                        isStopped={isStopped}
                        isPaused={isPaused}
                        
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                {/*---Custom Software Dev Block----*/}
                <Grid container 
                className={classes.serviceContainer}
                direction="row" 
                justify={matchesSM ? "center" : undefined}
                >
                    <Grid item
                     style={{marginLeft: matchesSM? '0': '50px'}}
                    >
                        <Typography variant="h4" 
                        style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                        Custom Software Development 
                        </Typography>
                        <Typography variant="subtitle2" className={classes.subtitle}> 
                            Save Energy. Save Time. Save Money 
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}> 
                            Complete digital solutions, from investigation to {' '}
                            <span className={classes.specialText}>celebration.</span> 
                        </Typography>
                        <Button 
                        variant="outlined"
                        className={classes.btn}
                        color="primary"
                        component={Link}
                        to="/custom"
                        onClick={() => props.setValue(1)}
                        >
                            Learn More
                            <ArrowForward/>
                        </Button>
                    </Grid>
                    <Grid item
                    className={classes.serviceIcon}
                    >
                        <img src={customSoftwareIcon} alt="Custom Software Development" />
                    </Grid>
                </Grid>
                {/*---iOS/Android App Block----*/}
                <Grid container 
                className={classes.serviceContainer}
                direction="row" 
                justify={matchesSM ? "center" : "flex-end"}
                >
                    <Grid item
                     style={{marginLeft: matchesSM? '0': '50px'}}
                    >
                        <Typography variant="h4"
                        style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                            iOS/Android App Development 
                        </Typography>
                        <Typography variant="subtitle2" className={classes.subtitle}> 
                            Extend Functionality. Extend Access. Increase Engagement. 
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}> 
                            Integrate your web experience or create a standalone app <br/>
                            with either mobile platform.
                        </Typography>
                        <Button 
                        variant="outlined"
                        className={classes.btn}
                        color="primary"
                        component={Link}
                        to="/mobile"
                        onClick={() => props.setValue(1)}
                        >
                            Learn More
                            <ArrowForward/>
                        </Button>
                    </Grid>
                    <Grid item
                    className={classes.serviceIcon}
                    >
                        <img src={mobileIcon} alt="iOS/Android App Development" />
                    </Grid>
                </Grid>
                {/*---Web App Dev Block----*/}
                <Grid container 
                className={classes.serviceContainer}
                direction="row" 
                justify={matchesSM ? "center" : undefined}
                >
                    <Grid item
                     style={{marginLeft: matchesSM? '0': '50px'}}
                    >
                        <Typography variant="h4"
                        style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                            Website Development 
                        </Typography>
                        <Typography variant="subtitle2" className={classes.subtitle}> 
                            Reach More. Discover More. Sell More. 
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}> 
                            Optimized for Search Engines, built for speed. 
                        </Typography>
                        <Button 
                        variant="outlined"
                        className={classes.btn}
                        color="primary"
                        component={Link}
                        to="/web"
                        onClick={() => props.setValue(1)}
                        >
                            Learn More
                            <ArrowForward/>
                        </Button>
                    </Grid>
                    <Grid item
                    className={classes.serviceIcon}
                    >
                        <img src={webIcon} alt="Website Development" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                {/*---Revolution Block----*/}
                <Grid container 
                justify="center" 
                alignItems="center" 
                className={classes.contentContainer}
                style={{marginTop: 100}}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography 
                            variant="h4" 
                            className={classes.cardTitle}
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}
                            >
                                The Revolution
                            </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle}>
                                Visionary insights coupled with cutting edge technology is a recipe for revolution
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                            variant="outlined"
                            className={classes.btn}
                            color="primary"
                            style={{margin: '0 auto'}}
                            component={Link}
                            to="/revolution"
                            onClick={() => props.setValue(2)}
                            >
                                Learn More
                                <ArrowForward/>
                            </Button>
                        </CardActions>
                    </Card>
                    <div className={classes.revolutionBackgroundImage}/>
                </Grid>
            </Grid>
            <Grid item>
                 {/*---ContactUs Block----*/}
                <Grid container
                className={classes.contentContainer}
                alignItems="center"
                direction="row">
                    <Grid item container 
                    justify="space-between" 
                    direction={matchesXS? 'column':'row'}
                    style={{position: 'absolute'}}>
                        <Grid item style={matchesXS ? 
                            {margin: "0 auto", textAlign: "center"} 
                            : {marginLeft: 50}}>
                            <Typography 
                            variant="h4" 
                            className={classes.subtitle}
                            style={{color: '#fff'}}>
                                About Us
                            </Typography>
                            <Typography 
                            variant="subtitle2" 
                            className={classes.subtitle}
                            style={{color: '#fff'}}>
                                Let's get personal
                            </Typography>
                            <Button 
                            variant="outlined"
                            className={classes.btn}
                            style={{color: '#fff', borderColor: '#fff'}}
                            component={Link}
                            to="/aboutus"
                            onClick={() => props.setValue(3)}
                            >
                                Learn More
                                <ArrowForward/>
                            </Button>
                        </Grid>
                        <Grid item style={matchesXS ? 
                            {margin: "50px auto", textAlign: "center",} 
                            : {marginRight: 50, textAlign: "right"}}>
                            <Typography 
                            variant="h4"
                            className={classes.subtitle}
                            style={{color: '#fff'}}>
                                Contact Us
                            </Typography>
                            <Typography 
                            variant="subtitle2"
                            className={classes.subtitle}
                            style={{color: '#fff'}}>
                                Say Hello!
                            </Typography>
                            <Button 
                            variant="outlined"
                            className={classes.btn}
                            style={{color: '#fff', borderColor: '#fff'}}
                            component={Link}
                            to="/contactus"
                            onClick={() => props.setValue(4)}
                            >
                                Learn More
                                <ArrowForward/>
                            </Button>
                        </Grid>
                    </Grid>
                    <div className={classes.contactUsBackgroundImage} />
                </Grid>
                
            </Grid>
            <Grid item>
                 {/*---CallToAction Block----*/}
                <Grid container
                className={classes.contentContainer}
                alignItems="center"
                direction="row">
                    <Grid item container 
                    justify="space-between" 
                    direction={matchesXS? 'column':'row'}
                    style={{position: 'absolute'}}>
                        <Grid item style={matchesXS ? 
                            {margin: "0 auto", textAlign: "center"} 
                            : {marginLeft: 50}}>
                            <Typography variant="h4" 
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
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
                            color="primary"
                            component={Link}
                            to="/estimate"
                            onClick={() => props.setValue(5)}
                            >
                                Learn More
                                <ArrowForward/>
                            </Button>
                        </Grid>
                        <Grid item style={matchesXS ? 
                            {margin: "50px auto", textAlign: "center",} 
                            : {marginRight: 50, textAlign: "right"}}>
                            <Button 
                            variant="contained" 
                            className={classes.estimate}
                            color="secondary"
                            component={Link}
                            to="/estimate"
                            onClick={() => props.setValue(5)}
                            >
                                Free Estimate
                            </Button>
                        </Grid>
                    </Grid>
                    <div className={classes.callToActionBackgroundImage} />
                </Grid>
                
            </Grid>
        </Grid>
        
    )
}