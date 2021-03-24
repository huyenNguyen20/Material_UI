import { makeStyles } from '@material-ui/styles';
import { Hidden, Grid } from '@material-ui/core';
import adormentPic from '../../assets/Footer Adornment.svg';
import {Link} from 'react-router-dom';
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.blue,
        zIndex: 1302,
        position: "relative",
    },
    adornment: {
        height: "10rem",
        verticalAlign: "bottom",
        [theme.breakpoints.down("sm")]:{
            height: "8rem",
        },
        [theme.breakpoints.down("xs")]:{
            height: "7rem",
        }
    },
    grid: {
        position: 'absolute',
        margin: "20px",
        zIndex: 1301
    },
    link: {
        textDecoration: 'none',
        color: "#fff",
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        },
        margin: '5px 20px'
    },
    socialIcons: {
        position: 'absolute',
        bottom: "0px",
        left: "90%",
        [theme.breakpoints.down("sm")]:{
            left: "75%",
        },
        [theme.breakpoints.down("xs")]:{
            left: "60%",
        },
        margin: "10px 0",
        minWidth: "100px"
    },
    socialIcon: {
        height: '30px',
        marginLeft: "20px"
    }
}))
export function Footer (props) {
    const options = [
        [
            {label: "Home", path: "/", value: 0}
        ],
        [
            {label: "Services", path: "/services", value: 1, selectedItem: 0},
            {label: "Custom Software Development", path:"/custom", value: 1, selectedItem: 1},
            {label: "Mobile Development", path:"/mobile", value: 1, selectedItem: 2},
            {label: "Website Development", path:"/web", value: 1, selectedItem: 3},
        ],
        [
            {label: "The Revolution", path: "/revolution", value: 2},
            {label: "Vision", path:"/revolution", value: 2},
            {label: "Technology", path:"/revolution", value: 2},
            {label: "Process", path:"/revolution", value: 2},
        ],
        [
            {label: "About Us", path: "/aboutus", value: 3},
            {label: "History", path:"/aboutus", value: 3},
            {label: "Team", path:"/aboutus", value: 3}
        ],
        [
            {label: "Contact Us", path: "/contactus", value: 4},
        ]

    ]
    const classes = useStyles();
    const gridItem = (option) => {
        return option.map((item, i) => (
            <Grid item 
            key={`${item}-${i}`}
            className={classes.link} 
            component={Link} 
            to={item.path}
            onClick={() => {
                if(item.value) props.setValue(item.value);
                if(item.selectedItem) props.setSelectedItem(item.selectedItem);
            }}
            >
                {item.label}
            </Grid>
        ))
    }
    return (
        <div className={classes.footer}>
            <Hidden smDown>
            <Grid container className={classes.grid} justify="center" spacing={2}>
              {options.map((option, i) => (
                  <Grid item  key={`${option}-${i}`}>
                      <Grid container direction="column">
                          {gridItem(option)}
                      </Grid>
                  </Grid>
              ))}
            </Grid>
            </Hidden>
            <img  className={classes.adornment} src={adormentPic} alt="adornment-pic" />
            <div className={classes.socialIcons}>
            <img  className={classes.socialIcon} src={facebookIcon} alt="facebook-icon" />
            <img  className={classes.socialIcon} src={instagramIcon} alt="instagram-icon" />
            </div>
        </div>
    );
}