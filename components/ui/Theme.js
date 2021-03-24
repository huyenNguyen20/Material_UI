import {createMuiTheme} from '@material-ui/core/styles';

const arcBlue = '#0b72b9';
const arcOrange = '#ffba60';
const arcGrey = '#868686';

const theme = createMuiTheme({
    palette: {
        common: {
            blue: `${arcBlue}`,
            orange: `${arcOrange}`,
        },
        primary: {
            main: `${arcBlue}`
        },
        secondary: {
            main: `${arcOrange}`
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: '1rem',
        },
        estimate: {
            color: "#fff",
            fontFamily: "Pacifico",
            textTransform: "none"
        },
        link: {
            textDecoration: "none",
            color: "#eee",
            "&:hover,:visited,:active": {
                color: "#fff"
            }
        },
        h3: {
            fontFamily: 'Raleway',
            color: arcBlue,
            fontWeight: 400
        },
        h4: {
            fontFamily: 'Raleway',
            color: arcBlue,
            fontWeight: 600
        },
        h6: {
            fontFamily: 'Raleway',
            color: arcBlue,
            fontWeight: 400
        },
        subtitle1: {
            fontFamily: 'Raleway',
            color: arcGrey,
            fontSize: '1.2rem'
        },
        subtitle2: {
            fontFamily: 'Raleway',
            color: arcGrey,
        },
        body1:{
            fontFamily: 'Raleway',
            color: arcGrey,
            fontSize: '1.1rem'
        }
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: `${arcBlue}`,
                fontSize: '1rem'
            }
        },
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: `2px solid ${arcBlue}`
                },
                "&:hover:not($disabled):not($focused):not($error):before":{
                    borderBottom: `2px solid ${arcBlue}`
                }
            }
        }
    }
})

export {theme}