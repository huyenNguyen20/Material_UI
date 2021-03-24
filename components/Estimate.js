import {
    Grid, 
    Typography,
    Button,
    IconButton,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogContent,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    CircularProgress,
    ListItemText,
    Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import Lottie from 'react-lottie';
import React, { useState, useEffect } from 'react';
import EstimateAnimation from '../animations/estimateAnimation/data.json';
import Send from '../assets/send.svg';
import Mobile from '../assets/mobile.svg';
import Website from '../assets/website.svg';
import Custom from '../assets/Custom Software Icon.svg';
import iphone from '../assets/iphone.svg';
import android from '../assets/android.svg';
import camera from '../assets/camera.svg';
import gps from '../assets/gps.svg';
import upload from '../assets/upload.svg';
import users from '../assets/users.svg';
import biometrics from '../assets/biometrics.svg';
import bell from '../assets/bell.svg';
import info from '../assets/info.svg';
import globe from '../assets/globe.svg';
import customized from '../assets/customized.svg';
import data from '../assets/data.svg';
import person from '../assets/person.svg';
import persons from '../assets/persons.svg';
import people from '../assets/people.svg';
import { cloneDeep } from 'lodash';
import axios from 'axios';
const defaultQuestions = [{
    id: 1,
    title: "Which service are you interested in?",
    subtitle: null,
    active: false, 
    options: [
        {
        id: 1,  
        title: "Custom Software development",
        subtitle: null,
        icon: Custom,
        iconAlt: "Three floating screens",
        selected: false,
        cost: 0
        },
        {
        id: 2,  
        title: "iOS/Mobile App development",
        subtitle: null,
        icon: Mobile,
        iconAlt: "Phone and Table Layout",
        selected: false,
        cost: 0
        },
        {
        id: 3,  
        title: "Website development",
        subtitle: null,
        icon: Website,
        iconAlt: "Computer",
        selected: false,
        cost: 0
        }
        ]
    },
    {
        id: 2,
        title: "Which platforms do you need supported?",
        subtitle: "Select all that apply.",
        options: [
          {
            id: 1,
            title: "Web Application",
            subtitle: null,
            icon: Website,
            iconAlt: "computer outline",
            selected: false,
            cost: 100
          },
          {
            id: 2,
            title: "iOS Application",
            subtitle: null,
            icon: iphone,
            iconAlt: "outline of iphone",
            selected: false,
            cost: 100
          },
          {
            id: 3,
            title: "Android Application",
            subtitle: null,
            icon: android,
            iconAlt: "outlines of android phone",
            selected: false,
            cost: 100
          }
        ],
        active: true
      },
      {
        id: 3,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
          {
            id: 1,
            title: "Photo/Video",
            subtitle: null,
            icon: camera,
            iconAlt: "camera outline",
            selected: false,
            cost: 25
          },
          {
            id: 2,
            title: "GPS",
            subtitle: null,
            icon: gps,
            iconAlt: "gps pin",
            selected: false,
            cost: 25
          },
          {
            id: 3,
            title: "File Transfer",
            subtitle: null,
            icon: upload,
            iconAlt: "outline of cloud with arrow pointing up",
            selected: false,
            cost: 25
          }
        ],
        active: false
      },
      {
        id: 4,
        title: "Which features do you expect to use?",
        subtitle: "Select all that apply.",
        options: [
          {
            id: 1,
            title: "Users/Authentication",
            subtitle: null,
            icon: users,
            iconAlt: "outline of a person with a plus sign",
            selected: false,
            cost: 25
          },
          {
            id: 2,
            title: "Biometrics",
            subtitle: null,
            icon: biometrics,
            iconAlt: "fingerprint",
            selected: false,
            cost: 25
          },
          {
            id: 3,
            title: "Push Notifications",
            subtitle: null,
            icon: bell,
            iconAlt: "outline of a bell",
            selected: false,
            cost: 25
          }
        ],
        active: false
      },
      {
        id: 5,
        title: "What type of custom features do you expect to need?",
        subtitle: "Select one.",
        options: [
          {
            id: 1,
            title: "Low Complexity",
            subtitle: "(Informational)",
            icon: info,
            iconAlt: "'i' inside a circle",
            selected: false,
            cost: 25
          },
          {
            id: 2,
            title: "Medium Complexity",
            subtitle: "(Interactive, Customizable, Realtime)",
            icon: customized,
            iconAlt: "two toggle switches",
            selected: false,
            cost: 50
          },
          {
            id: 3,
            title: "High Complexity",
            subtitle: "(Data Modeling and Computation)",
            icon: data,
            iconAlt: "outline of line graph",
            selected: false,
            cost: 100
          }
        ],
        active: false
      },
      {
        id: 6,
        title: "How many users do you expect?",
        subtitle: "Select one.",
        options: [
          {
            id: 1,
            title: "0-10",
            subtitle: null,
            icon: person,
            iconAlt: "person outline",
            selected: false,
            cost: 1
          },
          {
            id: 2,
            title: "10-100",
            subtitle: null,
            icon: persons,
            iconAlt: "outline of two people",
            selected: false,
            cost: 1.25
          },
          {
            id: 3,
            title: "100+",
            subtitle: null,
            icon: people,
            iconAlt: "outline of three people",
            selected: false,
            cost: 1.5
          }
        ],
        active: false
      }
]   
const softwareQuestions = [
    { ...defaultQuestions[0], active: false },
    {
      id: 2,
      title: "Which platforms do you need supported?",
      subtitle: "Select all that apply.",
      options: [
        {
          id: 1,
          title: "Web Application",
          subtitle: null,
          icon: Website,
          iconAlt: "computer outline",
          selected: false,
          cost: 100
        },
        {
          id: 2,
          title: "iOS Application",
          subtitle: null,
          icon: iphone,
          iconAlt: "outline of iphone",
          selected: false,
          cost: 100
        },
        {
          id: 3,
          title: "Android Application",
          subtitle: null,
          icon: android,
          iconAlt: "outlines of android phone",
          selected: false,
          cost: 100
        }
      ],
      active: true
    },
    {
      id: 3,
      title: "Which features do you expect to use?",
      subtitle: "Select all that apply.",
      options: [
        {
          id: 1,
          title: "Photo/Video",
          subtitle: null,
          icon: camera,
          iconAlt: "camera outline",
          selected: false,
          cost: 25
        },
        {
          id: 2,
          title: "GPS",
          subtitle: null,
          icon: gps,
          iconAlt: "gps pin",
          selected: false,
          cost: 25
        },
        {
          id: 3,
          title: "File Transfer",
          subtitle: null,
          icon: upload,
          iconAlt: "outline of cloud with arrow pointing up",
          selected: false,
          cost: 25
        }
      ],
      active: false
    },
    {
      id: 4,
      title: "Which features do you expect to use?",
      subtitle: "Select all that apply.",
      options: [
        {
          id: 1,
          title: "Users/Authentication",
          subtitle: null,
          icon: users,
          iconAlt: "outline of a person with a plus sign",
          selected: false,
          cost: 25
        },
        {
          id: 2,
          title: "Biometrics",
          subtitle: null,
          icon: biometrics,
          iconAlt: "fingerprint",
          selected: false,
          cost: 25
        },
        {
          id: 3,
          title: "Push Notifications",
          subtitle: null,
          icon: bell,
          iconAlt: "outline of a bell",
          selected: false,
          cost: 25
        }
      ],
      active: false
    },
    {
      id: 5,
      title: "What type of custom features do you expect to need?",
      subtitle: "Select one.",
      options: [
        {
          id: 1,
          title: "Low Complexity",
          subtitle: "(Informational)",
          icon: info,
          iconAlt: "'i' inside a circle",
          selected: false,
          cost: 25
        },
        {
          id: 2,
          title: "Medium Complexity",
          subtitle: "(Interactive, Customizable, Realtime)",
          icon: customized,
          iconAlt: "two toggle switches",
          selected: false,
          cost: 50
        },
        {
          id: 3,
          title: "High Complexity",
          subtitle: "(Data Modeling and Computation)",
          icon: data,
          iconAlt: "outline of line graph",
          selected: false,
          cost: 100
        }
      ],
      active: false
    },
    {
      id: 6,
      title: "How many users do you expect?",
      subtitle: "Select one.",
      options: [
        {
          id: 1,
          title: "0-10",
          subtitle: null,
          icon: person,
          iconAlt: "person outline",
          selected: false,
          cost: 1
        },
        {
          id: 2,
          title: "10-100",
          subtitle: null,
          icon: persons,
          iconAlt: "outline of two people",
          selected: false,
          cost: 1.25
        },
        {
          id: 3,
          title: "100+",
          subtitle: null,
          icon: people,
          iconAlt: "outline of three people",
          selected: false,
          cost: 1.5
        }
      ],
      active: false
    }
];
const websiteQuestions = [
{ ...defaultQuestions[0], active: false },
{
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
    {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "person outline",
        selected: false,
        cost: 100
    },
    {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        icon: customized,
        iconAlt: "outline of two people",
        selected: false,
        cost: 200
    },
    {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        icon: globe,
        iconAlt: "outline of three people",
        selected: false,
        cost: 250
    }
    ],
    active: true
}
];

const next = 'next';
const prev = 'prev';
const selectOne = "Select one.";
const lastQuestionTitle = "How many users do you expect?";

const useStyles = makeStyles(theme => ({
    icon: {
        maxWidth: '90%',
        maxHeight: '100%',
        marginTop: 20,
        
    },
    option: {
        width: '30%',
        height: 270,
        marginTop: 50,
        padding: '0 5%'
    },
    container: {
        margin: '2% 2% 5% 2%'
    },
    arrowNav: {
        width: '50%',
        marginTop: 20,
        textAlign: 'center'
    },
    estimate: {
        ...theme.typography.estimate,
        borderRadius: '20px',
        fontSize: "1.2rem",
        maxWidth: 200,
        marginTop: 20
    },
    textArea: {
        border: `2px solid ${theme.palette.common.blue}`,
        marginTop: 50,
        borderRadius: '5px',
        padding: 10
    },
    dialog: {
        marginTop: 80,
        minWidth: '300px',
        padding: '30px 50px',
        [theme.breakpoints.down('sm')] : {
            padding: '10px 0px'
        },
        zIndex: 1500,
        position: 'relative'
    },
    specialText: {
        fontFamily: "Pacifico",
        color: theme.palette.common.orange,
        fontSize: '1.5rem'
    },
}))

export function Estimate (props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [ isStopped, setIsStopped ] = useState(true);
    const [ isPaused, setIsPaused ] = useState(true);
    const [ questions, setQuestions ] = useState(defaultQuestions);
    const [ prevBtnDisabled, setPrevBtnDisabled ] = useState(false);
    const [ nextBtnDisabled, setNextBtnDisabled ] = useState(false);
    const [ open, setOpen ] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [total, setTotal] = useState(0);
    const [features, setFeatures ] = useState([]);
    const [userMultiplier, setUserMultiplier] = useState(null);
    const [loading, setLoading ] = useState(false);
    const [alert, setAlert] = useState({open: false, message: "", backgroundColor: ""});
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

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: EstimateAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
   
    const selectQuestion = (choice) => {
        const newQuestions = cloneDeep(questions);
        const activeQuestion = newQuestions.filter(question => question.active);
        const activeIndex = activeQuestion[0].id - 1;
        let nextActiveIndex = 0;
        if(choice === next) nextActiveIndex = activeIndex + 1;
        else nextActiveIndex = activeIndex - 1;

        newQuestions[activeIndex] = {...activeQuestion[0], active: false};
        newQuestions[nextActiveIndex] = {...newQuestions[nextActiveIndex], active: true};
        setQuestions(newQuestions);
        
        isTheEnd(newQuestions.length, nextActiveIndex);
    }; 

    const isTheEnd = (questionsLength, activeIndex) => {
        if(activeIndex === 0) {
            setPrevBtnDisabled(true);
            setNextBtnDisabled(false);
        }
        else if((questionsLength - 1) === activeIndex ) {
            setNextBtnDisabled(true);
            setPrevBtnDisabled(false);
        }
        else {  
            setPrevBtnDisabled(false);
            setNextBtnDisabled(false);
        }
    }

    const handleSelect = (id, subtitle) => {
        const newQuestions = cloneDeep(questions);
        const activeQuestionIndex = newQuestions.findIndex(question => question.active);
        const activeQuestion = newQuestions.filter(question => question.active);
        const optionIndex = newQuestions[activeQuestionIndex].options.findIndex(option => option.id === id);
        //If Question only allows 1 Answer
        if(subtitle === selectOne) {
            //Them, check if there is selected option
            const selectedOptionIdx = activeQuestion[0].options.findIndex(option => option.selected);
            //If yes, deselect the selected option
            if(selectedOptionIdx >= 0 && selectedOptionIdx !== optionIndex) 
                newQuestions[activeQuestionIndex].options[selectedOptionIdx].selected 
                = !newQuestions[activeQuestionIndex].options[selectedOptionIdx].selected;
        }
        newQuestions[activeQuestionIndex].options[optionIndex].selected 
        = !newQuestions[activeQuestionIndex].options[optionIndex].selected;
               
        setQuestions(newQuestions);
    }

    const getTotal = () => {
        let cost = 0;
        let userCost = 0;
        let chosenFeatures = [];
        const selections = questions.map(question => 
                                    question.options.filter(option => option.selected));
        
        selections.forEach(options => options.forEach(option => {
            cost += option.cost;
            chosenFeatures.push(option);
        }));

        const lastQuestion = questions.filter(question => question.title === lastQuestionTitle);
        const isLastQuestionSelected = lastQuestion[0].options.filter(option => option.selected);
        if(isLastQuestionSelected.length > 0)  {
            userCost = isLastQuestionSelected[0].cost;
            cost -= userCost;
            cost *= userCost;
            chosenFeatures = chosenFeatures.filter(option => option !== isLastQuestionSelected[0]);
            setUserMultiplier(isLastQuestionSelected[0]);
        }
        setTotal(cost);
        setFeatures(chosenFeatures);
    }

    const sendEstimate = () => {
        setLoading(true);
        let customFeatures = '';
        for (let i = 0; i < features.length; i++){ 
            if (i === 0) customFeatures = customFeatures.concat("",`${features[i].title} at $ ${features[i].cost}`);
            else customFeatures =  customFeatures.concat(', ', `${features[i].title} at $ ${features[i].cost}`);
        }
        
        axios.get("https://us-central1-expensify-test-7ff23.cloudfunctions.net/sendMail", {
            params:{
                name,
                email,
                phone,
                message,
                total,
                customFeatures,
                users: (userMultiplier === null) ? null : `${userMultiplier.title} users with ${userMultiplier.cost} multiplier`
                }
            }
        )
        .then (response => {
            setLoading(false);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setFeatures([]);
            setUserMultiplier(null);
            setTotal(0);
            setAlert({open: true, backgroundColor: 'green', message: 'Message sent successfully'})
        })
        .catch( err => {
            setAlert({open: true, backgroundColor: 'red', message: 'Something went wrong! Try again later.'})
        })
    }
    const dialog = (
        <React.Fragment>
            <Dialog open={open} 
            onClose={() => setOpen(false)}
            classes={{paper: classes.dialog}}
            fullScreen
            >
                <DialogContent>
                    <Grid container>
                        <Grid item container justify="center" >
                            <Grid item>
                                <Typography variant="h4" align="center" gutterBottom> Estimate Form </Typography>     
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <Grid item container direction="column" alignItems="center" sm>
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
                                <Grid item>
                                    <TextField
                                        InputProps={{disableUnderline: true}}
                                        id="message"
                                        value={message}
                                        error={Boolean(messageError)}
                                        helperText={messageError}
                                        onChange={e => { handleChange(e); }}
                                        multiline
                                        rows="5"
                                        className={classes.textArea}
                                        placeholder="Your message goes here"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" 
                                    style={{color: theme.palette.common.blue, maxWidth: "220px", marginTop: 20}}>
                                        We can create this digital solution with an estimate of {' '} 
                                        <span className={classes.specialText}>${total.toFixed(2)}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" alignItems="center" sm>
                                <Grid item>
                                    <Typography variant="body1" 
                                    style={{color: theme.palette.common.blue}}>
                                        You have chosen:
                                    </Typography>
                                    <List dense>
                                        {features.length > 0 && features.map(features => (
                                        <ListItem>
                                            <ListItemIcon style={{color: theme.palette.common.orange}}>
                                                <CheckIcon/>
                                            </ListItemIcon>
                                            <ListItemText disableTypography
                                            style={{color: theme.palette.common.blue, fontSize: '1.2rem'}}>
                                                {features.title} at {' '}
                                                <span className={classes.specialText}>
                                                    ${features.cost}
                                                </span>
                                                .
                                            </ListItemText>
                                        </ListItem>
                                        ))}
                                        {userMultiplier !== null && (
                                        <ListItem>
                                            <ListItemIcon style={{color: theme.palette.common.orange}}>
                                                <CheckIcon/>
                                            </ListItemIcon>
                                            <ListItemText disableTypography
                                            style={{color: theme.palette.common.blue, fontSize: '1.2rem'}}>
                                                {userMultiplier.title} users with {' '}
                                                <span className={classes.specialText}>
                                                    {userMultiplier.cost} multiplier.
                                                </span>
                                                .
                                            </ListItemText>
                                        </ListItem>
                                        )}
                                    </List>
                                </Grid>
                                <Grid item>
                                   
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container style={{marginTop: 20}}>
                            <Grid item style={{width: '40%', textAlign: 'right', marginRight: '5%'}}>
                                <Button variant="text" color="primary" 
                                onClick={() => setOpen(false)}
                                style={{fontSize: '1.2rem', marginTop: 20}}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item style={{width: '40%', marginLeft: '5%'}}>
                                <Button variant="contained" color="secondary"
                                disabled={
                                    Boolean(
                                        name === '' || nameError ||
                                        email === '' || emailError ||
                                        phone === '' || phoneError ||
                                        message === '' || messageError ||
                                        total === 0
                                        )
                                }
                                className={classes.estimate}
                                onClick={() => {sendEstimate(); setOpen(false);}}>
                                    {loading? <CircularProgress/> : 
                                    ( 
                                        <React.Fragment>    
                                            Send Estimate
                                            <img src={Send} alt="Paper Airplane" style={{marginLeft: 10}} />
                                        </React.Fragment>
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );

    return(
        <Grid container >
            <Snackbar open={alert.open} message={alert.message} 
            ContentProps={{style: {backgroundColor: alert.backgroundColor}}} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => setAlert({...alert, open: false})} 
            autoHideDuration={4000} />
            <Grid item container className={classes.container}>
                <Grid item >
                    <Typography variant="h4">Estimate</Typography>
                </Grid>
            </Grid>
            <Grid item container className={classes.container}>
                <Grid item container lg={5}>
                    <Grid item>
                        <Lottie 
                        options={defaultOptions}
                        height={matchesSM? 200: 400}
                        width={matchesSM? 200: 400}
                        isStopped={isStopped}
                        isPaused={isPaused}
                        />
                    </Grid>
                </Grid>
                <Grid item container lg={7}>
                    <Grid item container>
                        {/*----INJECT DATA BEGINS----- */}
                        {questions.filter(question => question.active).map((question, id) => 
                        (<React.Fragment  key={`${question}-${id}`}>
                            <Grid item container>
                                <Grid item container justify="center">
                                    <Typography variant="h4" style={{fontWeight: 400, lineHeight: 1.25}}>
                                        {question.title}
                                    </Typography>
                                </Grid>
                                <Grid item container justify="center">
                                    <Typography variant="subtitle1">{question.subtitle}</Typography>
                                </Grid>
                                
                            </Grid>
                            <Grid item container justify="space-between">
                                {question.options.map((option, id) => (
                                    <React.Fragment key={`${option}-${id}`}>
                                        <Grid item container 
                                        direction="column"
                                        component={Button}
                                        style={{display: 'grid', textTransform: 'none'
                                            , backgroundColor: option.selected? theme.palette.common.orange : null}}
                                        onClick={() => {handleSelect(option.id, question.subtitle)}}
                                        className={classes.option}>
                                            <Grid item>
                                                <Typography variant="h6" align="center">{option.title}</Typography>
                                                <Typography variant="subtitle2" align="center">{option.subtitle}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img src={option.icon} alt={option.iconAlt} className={classes.icon}/>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                    
                                ))}
                            </Grid>
                        </React.Fragment>))
                        }
                        
                        {/*----INJECT DATA ENDS----- */}
                        {dialog}
                        <Grid item container >
                            <Grid item container justify="center" className={classes.arrowNav}>
                                <IconButton color="primary" 
                                disabled={prevBtnDisabled}
                                onClick={() => selectQuestion(prev)}>
                                    <ArrowBack />
                                </IconButton>
                            </Grid>
                            <Grid item container justify="center" className={classes.arrowNav}>
                                <IconButton color="primary" 
                                disabled={nextBtnDisabled}
                                onClick={() => selectQuestion(next)}>
                                    <ArrowForward />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item container justify="center">
                            <Button className={classes.estimate} 
                            variant="contained" color="secondary"
                            onClick={() => {setOpen(true); getTotal()}}
                            >
                                Get Estimate
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
    )
}