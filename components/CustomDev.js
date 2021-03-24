import {
    Grid,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
    Hidden
} from '@material-ui/core';
import {AirlineSeatIndividualSuite, ArrowBack, ArrowForward} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import Lottie from 'react-lottie';
import {Link} from 'react-router-dom';
import Bulb from '../assets/bulb.svg';
import Cash from '../assets/cash.svg';
import StopWatch from '../assets/stopwatch.svg';
import TechAnimation from '../animations/technologyAnimation/data.json';
import ScaleAnimation from '../animations/scaleAnimation/data.json';
import Root from '../assets/globe.svg';

const useStyles = makeStyles(theme => ({
    contentContainer: {
        width: '40%',
        marginLeft: "2%",
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            marginLeft: 0,
            padding: '5%'
        }
    },
    container: {
        margin: '50px 0'
    },
    iconContainer: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '30px'
        }
    }
}))

export function CustomDev(props){
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [isStopped, setIsStopped] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const defaultOption = {
        loop: true,
        autoplay: true, 
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item container style={{marginLeft: matchesSM? '0' : '5%'}}>
                <Hidden smDown>
                <Grid item>
                    <IconButton 
                    color="primary"
                    component={Link} 
                    to="/services" 
                    onClick={() => {props.setValue(1)}}>
                        <ArrowBack/>
                    </IconButton>
                </Grid>
                </Hidden>
                <Grid item className={classes.contentContainer}>
                    <Typography variant="h4" gutterBottom> Custom Software Development </Typography>
                    <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </Typography>
                    <Typography variant="body1">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                    qui officia deserunt mollit anim id est laborum.
                    </Typography>
                    <Typography variant="body1">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur.
                    </Typography>
                </Grid>
                <Hidden smDown>
                    <Grid item container justify="flex-end" style={{width: '45%'}}>
                        <Grid item>
                            <IconButton 
                            color="primary"
                            component={Link} 
                            to="/mobile" 
                            onClick={() => {props.setSelectedItem(2)}}>
                                <ArrowForward/>
                            </IconButton>
                        </Grid>
                        
                    </Grid>
                </Hidden>
                
            </Grid>
            <Grid item container justify="center" className={classes.container}>
                <Grid item container className={classes.iconContainer}
                direction="column" alignItems="center" sm>
                    <Grid item>
                        <Typography variant="h4"
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                            Save Energy
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img src={Bulb} alt="light bulb" />
                    </Grid>
                </Grid>
                <Grid item container className={classes.iconContainer}
                direction="column" alignItems="center" sm>
                    <Grid item>
                        <Typography variant="h4"
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                            Save Time
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img src={StopWatch} alt="Stop watch" />
                    </Grid>
                </Grid>
                <Grid item container className={classes.iconContainer}
                direction="column" alignItems="center" sm>
                    <Grid item>
                        <Typography variant="h4"
                            style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                            Save Energy
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img src={Cash} alt="Cash" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container className={classes.container} 
            justify={matchesSM? undefined: "space-between"}>
                <Grid item container  justify="center" 
                className={classes.contentContainer} 
                style={{margin: matchesSM? "0 0 5% 0":"0 0 5% 0"}}>
                    <Grid item style={{width: matchesSM? '100%' : '60%'}}>
                        <Typography variant="h4" style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}} gutterBottom> Digital Document & Data </Typography>
                        <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Typography>
                        <Typography variant="body1">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                        qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Lottie 
                            options={{...defaultOption, animationData: TechAnimation}}
                            height={200}
                            width={200}
                            isStopped={isStopped}
                            isPaused={isPaused}
                            />
                    </Grid>
                </Grid>
                <Grid item container justify="center"
                className={classes.contentContainer} style={{margin: matchesSM? "5% 0 0 0":"0 5% 0 0"}}>
                    <Grid item>
                        <Lottie 
                            options={{...defaultOption, animationData: ScaleAnimation}}
                            height={250}
                            width={250}
                            isStopped={isStopped}
                            isPaused={isPaused}
                            />
                    </Grid>
                    <Grid item style={{width: matchesSM? '100%' : '55%'}}>
                        <Typography variant="h4" 
                        style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}} 
                        align="right" gutterBottom> 
                            Scale 
                        </Typography>
                        <Typography variant="body1" align="right">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item container justify={matchesSM? undefined: "center"}>
                <Grid item container justify={matchesSM? undefined: "center"} 
                className={classes.contentContainer} 
                style={{marginRight: "2%"}}>
                    <Grid item>
                        <img src={Root} alt="Roots" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" 
                        style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}} 
                        align={matchesSM? "left" : "center"} gutterBottom> 
                            Root-Cause Analysis
                        </Typography>
                        <Typography variant="body1" align={matchesSM? "left" : "center"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <Typography variant="body1" align={matchesSM? "left" : "center"}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}