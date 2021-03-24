import {
    Grid,
    Button,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import customSoftwareIcon from '../assets/Custom Software Icon.svg';
import mobileIcon from '../assets/mobileIcon.svg';
import webIcon from '../assets/websiteIcon.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    btn: {
        borderRadius: '20px',
        fontSize: "0.8rem",
    },
    subtitle: {
        marginBottom: 20
    },
    specialText: {
        fontFamily: "Pacifico",
        color: theme.palette.common.orange
    },
    serviceContainer: {
        margin: '100px 0',
        [theme.breakpoints.down('sm')]: {
            padding: '0 5%'
        }
    },
    serviceContainerOdd: {
        marginRight: '5%',
        margin: '100px 0',
        [theme.breakpoints.down('sm')]: {
            padding: '0 5%',
            marginRight: '0',
        }
    },
    serviceIcon: {
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '50px'
        }
    },
    contentContainer: {
        margin: '50px 0'
    },
}))

export function Services (props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid container>
            <Grid item >
                <Typography variant="h4" style={{marginLeft: '10%'}}> Services </Typography>
            </Grid>
             {/*---iOS/Android App Block----*/}
            <Grid item container 
            className={classes.serviceContainerOdd}
            direction={matchesSM ? "column" : "row"} 
            justify={matchesSM ? undefined : "flex-end"}
            alignItems={matchesSM? "center":undefined}
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
                    <Typography variant="subtitle1"> 
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
            {/*---Custom Software Dev Block----*/}
            <Grid item container 
            className={classes.serviceContainer}
            direction={matchesSM ? "column" : "row"}
            alignItems={matchesSM? "center":undefined}
            style={{marginLeft: '5%'}}
            >
                <Grid item>
                    <Typography variant="h4" 
                    style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                    Custom Software Development 
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtitle}> 
                        Save Energy. Save Time. Save Money 
                    </Typography>
                    <Typography variant="subtitle1"> 
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
            {/*---Web App Dev Block----*/}
            <Grid item container 
            className={classes.serviceContainerOdd}
            direction={matchesSM ? "column" : "row"} 
            justify={matchesSM ? undefined : "flex-end"}
            alignItems={matchesSM? "center":undefined}
            >
                <Grid item
                    style={{marginLeft: matchesSM? '0':'50px'
                    , width: matchesSM? "auto":"530px"}}
                >
                    <Typography variant="h4" 
                    style={{fontSize: matchesSM ? "1.2rem":"1.6rem"}}> 
                        Website Development 
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtitle}> 
                        Reach More. Discover More. Sell More. 
                    </Typography>
                    <Typography variant="subtitle1"> 
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
                style={{width: matchesSM? "auto":"330px"}}
                >
                    <img src={webIcon} alt="Website Development" />
                </Grid>
            </Grid>
        </Grid>
    )
} 