import { 
  AppBar, 
  Toolbar, 
  useScrollTrigger ,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {theme} from './Theme';
import logo from './../../assets/logo.svg';
import {Link} from '../../../node_modules/react-router-dom';


function ElevationScroll(props) {
    const { children} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme =>({
    toolbarMargin: {
      ...theme.mixins.toolbar,
      height: "5rem",
      [theme.breakpoints.down("sm")] : {
        height: '4rem'
      },
      [theme.breakpoints.down("xs")] : {
        height: '3.5rem'
      }
    },
    menuMargin: {
      ...theme.mixins.toolbar,
      height: "4rem"
    },
    logo: {
      height: '5rem',
      "&:hover": {
        backgroundColor: "transparent"
      },
      [theme.breakpoints.down("sm")] : {
        height: '4rem'
      },
      [theme.breakpoints.down("xs")] : {
        height: '3.5rem'
      }
    },
    logoBtn: {
      padding: "0"
    },
    tabContainer: {
      marginLeft: "auto"
    },
    tab: {
      ...theme.typography.tab,
      minWidth: 10,
      marginLeft: "5px",
    },
    estimate: {
      ...theme.typography.estimate,
      borderRadius: '15px',
      margin: "0 15px",
      textAlign: "center"
    },
    menu: {
      backgroundColor: theme.palette.common.blue,
      color: "#fff",
      borderRadius: "0",
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover":{
        opacity: 1
      }
    },
    menuIconBtn: {
      marginLeft: "auto",
      "&:hover":{
        backgroundColor: "transparent"
      }
    },
    drawer: {
      backgroundColor: theme.palette.common.blue
    },
    listItem: {
      ...theme.typography.tab,
      color: "#fff",
      opacity: 0.7,
      "&:hover": {
        opacity: 1
      }
    },
    listItemSelected: {
      opacity: 1
    },
    appBar: {
      zIndex: 1390
    }
  })
)
export function Header(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const handleChange = (event, value) => {
      props.setValue(value)
    }

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
      setOpen(true);
    }

    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
    }

    const handleMenuItemClicked = (e, i) => {
      props.setSelectedItem(i);
    }
    const serviceOptions = [
      {label: "Service", path:"/services", activeIndex: 1, selectedIndex: 0},
      {label: "Custom Software Development", path:"/custom", activeIndex: 1, selectedIndex: 1},
      {label: "Mobile App Development", path: "/mobile", activeIndex: 1, selectedIndex: 2},
      {label: "Website Development", path: "/web", activeIndex: 1, selectedIndex: 3}
    ]
    const options = [
      {label: "Home", path:"/", activeIndex: 0},
      {label: "Services", path:"/services", activeIndex: 1, ariaOwns: anchorEl ? "simple-menu" :  undefined,
      ariaHaspopup: anchorEl ? "true" : undefined, onMouseOver: (event) => handleClick(event)},
      {label: "The Revolution", path: "/revolution", activeIndex: 2},
      {label: "About Us", path: "/aboutus", activeIndex: 3},
      {label: "Contact Us", path: "/contactus", activeIndex: 4},
      {label: "Free Estimate", path: "/estimate", style: {backgroundColor: theme.palette.common.orange}, activeIndex: 5}
    ]
    useEffect(() => {
      [...serviceOptions, ...options].forEach((option) => {
        switch(window.location.pathname){
          case `${option.path}`: 
            if(props.value !== option.activeIndex) 
            props.setValue(option.activeIndex);
            if(option.selectedIndex && option.selectedIndex !== props.selectedItem) 
            props.setSelectedItem(option.selectedItem);
            break;
          default:
            break;
        }
      })
    }, [props.value, serviceOptions, options, props.selectedItem, props])
    const tabs = (
      <React.Fragment>
      <Tabs 
      value={props.value} 
      onChange={handleChange} 
      className={classes.tabContainer}
      indicatorColor='primary'
      > 
      {
        options.map((option, id) => {
          if (id !== (options.length-1) )
          return (<Tab 
          key={`${option}-${id}`}
          aria-owns={option.ariaOwns}
          aria-haspopup={option.ariaHaspopup}
          onMouseOver={option.onMouseOver}
          component={Link}
          to={option.path}
          className={classes.tab}
          label={option.label}/>
          ) 
      })}
      </Tabs>
      <Button 
      variant="contained"
      component={Link}
      to="/estimate"
      className={classes.estimate} 
      color="secondary">
        Free Estimate
      </Button>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{onMouseLeave: handleClose}}
      classes={{paper: classes.menu}}
      elevation={0}
      >
        <div className={classes.menuMargin} />
        {serviceOptions.map((option, i) => (
          <MenuItem
          key={`${option}-${i}`}
          component={Link}
          to={`${option.path}`}
          onClick={(e) => {
            handleMenuItemClicked(e, i);
            props.setValue(1);
            handleClose();
          }}
          classes={{root: classes.menuItem}}
          selected={i === props.selectedItem && props.value === 1}
          > 
            {option.label} 
          </MenuItem>
        ))}
      </Menu>
      </React.Fragment>
    );
    
    const drawer = (
      <React.Fragment>
        <SwipeableDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
          classes={{paper: classes.drawer}}
        >
          <div className={classes.toolbarMargin} />
          <List >
            {options.map((option, i) => (
              <ListItem
              key={`${option}-${i}`}
                className={(i === props.value) ? 
                  [classes.listItem, classes.listItemSelected] 
                  : classes.listItem}
                style={option.style}
                component={Link}
                to={option.path}
                button
                divider
                selected={i === props.value}
                onClick={() => {props.setValue(i); setOpenDrawer(false)}}
              >
                <ListItemText
                  disableTypography
                >
                  {option.label}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        <IconButton 
        className={classes.menuIconBtn} 
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        >
          <MenuIcon fontSize="large"/>
        </IconButton >
      </React.Fragment>
    )
    return(
      <React.Fragment>
        <ElevationScroll>
          <AppBar className={classes.appBar} position="fixed">
              <Toolbar disableGutters={true}>
                <Button
                component={Link}
                className={classes.logoBtn}
                disableRipple
                to="/"
                >
                <img src={logo} className={classes.logo} alt="company logo"/>
                </Button>
                {matches ? drawer :  tabs }
              </Toolbar>
          </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </React.Fragment>
    )
}