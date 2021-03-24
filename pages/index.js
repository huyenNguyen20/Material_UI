import React, {useState} from 'react';
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  useTheme,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
  Dialog,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel, 
  Select,
  MenuItem,
  Button,
  Snackbar,
  useMediaQuery,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {format} from 'date-fns';
import EnhancedTable from '../src/ui/EnhancedTable';

const useStyles = makeStyles(theme =>({
  dialog: {
    padding: '20px 50px',
    minWidth: '60%'
  }
}));
export default function Index() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [websiteChecked, setWebsiteChecked ] = useState(false);
  const [iOSChecked, setIOSChecked ] = useState(false);
  const [androidChecked, setAndroidChecked ] = useState(false);
  const [softwareChecked, setSoftwareChecked ] = useState(false);
  const [openDialog, setOpenDialog ] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService ] = useState("");
  const [complexity, setComplexity ] = useState("");
  const [users, setUsers ] = useState("");
  const [platforms, setPlatforms ] = useState([]);
  const [features, setFeatures ] = useState([]);
  const [rows, setRows] = useState([
    { name: "Elsa", date: "02/12/2020", service: "Website", 
    features: "N/A", complexity: "N/A", platforms: "N/A",
     users: "N/A", total: "$150", search: true },
     { name: "Misty", date: "01/12/2020", service: "Mobile", 
    features: "GPS, File Transfer", complexity: "Hard", platforms: "iOS, Android",
     users: "100+", total: "$2000", search: true },
     { name: "Jacob", date: "03/23/2020", service: "Custom Software", 
    features: "Video/Audio", complexity: "Medium", platforms: "Web",
     users: "10-100", total: "$1250", search: true },
     { name: "Mike", date: "03/23/2020", service: "Custom Software", 
    features: "Video/Audio", complexity: "Medium", platforms: "Web",
     users: "10-100", total: "$1250", search: true },
     { name: "Kevin", date: "03/23/2020", service: "Custom Software", 
    features: "Video/Audio", complexity: "Medium", platforms: "Web",
     users: "10-100", total: "$1250", search: true },
     { name: "Jane", date: "03/23/2020", service: "Software", 
    features: "Video/Audio", complexity: "Medium", platforms: "Android",
     users: "10-100", total: "$1250", search: true }
  ]);
  const [search, setSearch ] = useState("");
  const [alert, setAlert] = useState({open: false, message: "", backgroundColor: ""});
  const [selected, setSelected] = React.useState([]);

  const createData = (name, date, service, features, complexity, platforms, users, total, search) => {
    return { name, date, service, features, complexity, platforms, users, total, search };
  }
  
  const platformsData = ["Web", "iOS", "Android"];

  const featuresData = ["Photo/Video", "GPS", "File Transfer", 
        "Users/Authentication", "Biometrics", "Push Notifications"];
  
  const resetValueToDefault = () => {
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  }

  const addProject = () => {
    setOpenDialog(false);
    const newRows = [...rows];
    const newEntry = createData(
      name,
      format(date, "MM/dd/yyyy"),
      service,
      features.length > 0 ? features.join(", ") : "N/A",
      complexity !== "" ? complexity : "N/A",
      platforms.length > 0 ? platforms.join(", ") : "N/A",
      users !== "" ? users : "N/A",
      `$${total}`,
      true
    );
    newRows.push(newEntry);
    setRows(newRows);
    resetValueToDefault();
  }

  const deleteRows = (selected) => {
    const newRows = [...rows];
    newRows.map(row => selected.includes(row) ? row.search = false : row.search = true);
    setRows(newRows);
    setAlert({open: true, message: `You have deleted ${selected.length} items`, backgroundColor: "red"});
  }

  const confirmDeleteRows = () => {
    const newRows = [...rows];
    setAlert({...alert, open: false});
    setRows(newRows.filter(row => row.search == true));
    setSelected([]);
  }

  const undoDelete = () => {
    setAlert({...alert, open: false});
    const newRows = [...rows];
    newRows.map(row =>  row.search = true);
    setRows(newRows);
    setSelected([]);
  }

  const dialog = (
    <React.Fragment>  
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={openDialog} 
      onClose={() => setOpenDialog(false)} 
      fullScreen={matchesSM ? true : undefined}
      classes={{paper: classes.dialog}}>
        <Grid container>
          <Grid item container justify="center">
            <Grid item>
              <Typography variant="h3">Add a Project</Typography>
            </Grid>
          </Grid>
          <Grid item container justify={matchesSM? "center" : "space-between"} style={{marginTop: '2em'}}>
            <Grid item style={{width: matchesSM ? '100%':'25%'}}>
              <TextField 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              fullWidth={matchesSM ? true : undefined}
              />
            </Grid>
            <Grid item style={{
              width: matchesSM ? '100%':'25%', 
              marginTop: matchesSM? '21px':'16px', 
              marginLeft: matchesSM? '0px' : '0'
              }}>
              <KeyboardDatePicker
                clearable
                value={date}
                placeholder="10/10/2018"
                onChange={value => setDate(value)}
                minDate={new Date()}
                format="MM/dd/yyyy"
                fullWidth={matchesSM ? true : undefined}
              />

            </Grid>
            <Grid item style={{width: matchesSM ? '100%':'25%',marginTop: matchesSM? '16px':'0'}}>
              <TextField 
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              label="Total"
              fullWidth={matchesSM ? true : undefined}
              InputProps={{startAdornment: 
                <InputAdornment>
                  <DollarIcon color="secondary"/>
                </InputAdornment>
              }}
              />
            </Grid>
          </Grid>
          <Grid item container justify={matchesSM? "flex-start": "space-between"} style={{marginTop: '3em'}}>
            <Grid item container justify={"flex-start"} style={{width: matchesSM ? '100%':'25%', marginTop: matchesSM ? '3em':'0'}}>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <Typography variant="h5" 
                    style={{color: theme.palette.common.blue}}>
                      Service
                    </Typography>
                  </FormLabel>
                  <RadioGroup id="service" value={service} 
                  onChange={(e) =>{ 
                    if(e.target.value === "Website"){
                      setComplexity("");
                      setUsers("");
                      setPlatforms([]);
                    }
                    setService(e.target.value)
                    }}>
                    <FormControlLabel value="Website" control={<Radio/>} label="Website" style={{fontSize: '0.9rem'}}/>
                    <FormControlLabel value="Mobile" control={<Radio/>} label="Mobile App" style={{fontSize: '0.9rem'}} />
                    <FormControlLabel value="Custom Software" control={<Radio/>} label="Custom Software"style={{fontSize: '0.9rem'}} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justify={matchesSM? "flex-start":"center"} style={{width: matchesSM ? '100%':'25%', marginTop: matchesSM ? '3em':'0'}}>
              <Grid item>
                <FormControl component="fieldset"
                disabled={service === "Website" ? true : undefined}>
                  <FormLabel component="legend">
                    <Typography variant="h5" 
                    style={{color: theme.palette.common.blue}}>
                      Complexity
                    </Typography>
                  </FormLabel>
                  <RadioGroup id="complexity" value={complexity} 
                  onChange={(e) => setComplexity(e.target.value)}
                  >
                    <FormControlLabel value="Low" control={<Radio/>} label="Low" style={{fontSize: '0.9rem'}}/>
                    <FormControlLabel value="Medium" control={<Radio/>} label="Medium" style={{fontSize: '0.9rem'}} />
                    <FormControlLabel value="High" control={<Radio/>} label="High"style={{fontSize: '0.9rem'}} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justify={matchesSM? "flex-start" : "flex-end"} style={{width: matchesSM ? '100%':'25%', marginTop: matchesSM ? '3em':'0'}}>
              <Grid item>
              <FormControl component="fieldset"
              disabled={service === "Website" ? true : undefined}>
                <FormLabel component="legend">
                  <Typography variant="h5" 
                  style={{color: theme.palette.common.blue}}>
                    Users
                  </Typography>
                </FormLabel>
                <RadioGroup id="users" value={users} 
                onChange={(e) => setUsers(e.target.value)}
                >
                  <FormControlLabel value="0-10" control={<Radio/>} label="0-10" style={{fontSize: '0.9rem'}}/>
                  <FormControlLabel value="10-100" control={<Radio/>} label="10-100" style={{fontSize: '0.9rem'}} />
                  <FormControlLabel value="100+" control={<Radio/>} label="100+"style={{fontSize: '0.9rem'}} />
                </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container  style={{marginTop: '3em'}}>
            <Grid item container justify={"flex-start"} sm>
              <Grid item>
                <FormControl style={{minWidth:  '15em'}}>
                  <InputLabel>Platforms</InputLabel>
                  <Select 
                  value={platforms} 
                  onChange={(e) => setPlatforms(e.target.value)} 
                  multiple
                  disabled={service === "Website" ? true : undefined}
                  >
                    {platformsData.map((platform, id) => (
                        <MenuItem key={`${platform}-${id}`} value={platform}>{platform}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container justify={matchesXS? "flex-start" : "flex-end"} sm>
              <Grid item>
                <FormControl style={{width:  '15em'}}>
                  <InputLabel>Features</InputLabel>
                  <Select 
                  value={features} 
                  onChange={(e) => setFeatures(e.target.value)} 
                  multiple
                  >
                    {featuresData.map((feature, id) => (
                      <MenuItem  key={`${feature}-${id}`} value={feature}>{feature}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container style={{marginTop: '3em'}}>
            <Grid item justify={matchesXS? "center" : "flex-end"} container sm>
              <Grid item>
                <Button variant="text" color="primary" 
                onClick={() => setOpenDialog(false)}
                style={{ textTransform: 'none', margin: '3px 10px 0 0'}}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item justify={matchesXS? "center":"flex-start"} container sm>
              <Grid item>
                <Button variant="contained" color="secondary" 
                onClick={() => addProject()}
                style={{color: '#fff', borderRadius: 15, 
                  fontSize: '1.1rem', textTransform: 'none'}}
                disabled={service === "Website" ? 
                      name.length === 0 || total.length === 0 
                      || features.length === 0 : name.length === 0 
                      || total.length === 0  || features.length === 0 
                      || complexity.length === 0 || users.length === 0 
                      || platforms.length === 0}
                >
                  Add Project
                  <AddIcon style={{marginLeft: 5}}/>
                </Button>
              </Grid>
            </Grid>
           
          </Grid>
        </Grid>
      </Dialog>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
  
  const findItem = (searchTerm) => {
    const rowCopy = [...rows];
    const rowData = rowCopy.map(row => Object.values(row)
          .filter(value => value !== true && value !== false));
    const values = rowData.map(row => row.map(option => 
              option.toLowerCase().includes(searchTerm.toLowerCase())));
    values.map((row, idx) => row.includes(true) 
              ? rowCopy[idx].search = true 
              : rowCopy[idx].search = false);
    setRows(rowCopy);
  }

  return (
    <Grid container>
      <Snackbar open={alert.open} message={alert.message} 
      ContentProps={{style: {backgroundColor: alert.backgroundColor}}} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={(event, reason) => { 
        if(reason === "clickaway"){
          confirmDeleteRows(); 
        }
        setAlert({...alert, open: false});
      }}
      action={(
        <Button variant="text" style={{color: "#fff"}} onClick={() => undoDelete()}>
          Undo
        </Button>
      )}
      />
      {dialog}
      <Grid item container style={{marginTop: '2em', marginLeft: matchesSM ? '2em' : '5em'}}>
        <Grid item >
          <Typography variant="h1">Projects</Typography>
        </Grid>
      </Grid>
      <Grid item container style={{marginTop: '2em', marginLeft: matchesSM ? '1em' : '5em'}}>
        <Grid item >
          <TextField
          label="Search or Create Project"
          id="searchBox"
          style={{width:  matchesXS ? '20em' : matchesSM ? '20em' : '30em'}}
          value={search}
          onChange={(e) => {findItem(e.target.value); setSearch(e.target.value);}}
          InputProps={{
            endAdornment: 
            <InputAdornment position="end">
              <IconButton onClick={() => setOpenDialog(true)}>
                <AddIcon color="primary"/>
              </IconButton>
            </InputAdornment>,
          }}
          />
        </Grid>
      </Grid>
      <Grid item container style={{marginTop: '2em', marginLeft: matchesSM ? '2em' : '5em'}}>
          <Grid item>
            <FormGroup row={matchesSM ? false : true}>
              <FormControlLabel
              style={{marginLeft: matchesSM ? '0' : '5em'}}
              checked={websiteChecked}
              control={<Switch color="primary" />}
              onChange={() => {
                setWebsiteChecked(!websiteChecked);
              }}
              label="Website"
              labelPlacement={matchesSM ? "end" : "start"}
               />
               <FormControlLabel
              style={{marginLeft: matchesSM ? '0' : '5em'}}
              checked={androidChecked}
              control={<Switch color="primary" />}
              onChange={() => {
                setAndroidChecked(!androidChecked);
              }}
              label="Android Apps"
              labelPlacement={matchesSM ? "end" : "start"}
               />
               <FormControlLabel
              style={{marginLeft: matchesSM ? '0' : '5em'}}
              checked={iOSChecked}
              control={<Switch color="primary" />}
              onChange={() => {
                setIOSChecked(!iOSChecked);
              }}
              label="iOS Apps"
              labelPlacement={matchesSM ? "end" : "start"}
               />
               <FormControlLabel
              style={{marginLeft: matchesSM ? '0' : '5em'}}
              checked={softwareChecked}
              control={<Switch color="primary" />}
              onChange={() => {
                setSoftwareChecked(!softwareChecked);
              }}
              label="Software"
              labelPlacement={matchesSM ? "end" : "start"}
               />
            </FormGroup>
          </Grid>
      </Grid>
      <Grid item container style={{marginTop: '2em', marginBottom: '20em', width: '100%'}}>
        <EnhancedTable 
        rows={rows.filter(row => row.search)} 
        deleteRows={deleteRows}
        selected={selected}
        setSelected={setSelected}
        softwareChecked={softwareChecked}
        websiteChecked={websiteChecked}
        androidChecked={androidChecked}
        iOSChecked={iOSChecked}
        />
      </Grid>
    </Grid>
  );
}
