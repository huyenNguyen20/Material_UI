import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {InputAdornment, useTheme} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import DollarIcon from '@material-ui/icons/AttachMoney';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'date', label: 'Date' },
  { id: 'service', label: 'Service' },
  { id: 'features', label: 'Features' },
  { id: 'complexity',label: 'Complexity' },
  { id: 'platforms',label: 'Platforms' },
  { id: 'users',label: 'Users' },
  { id: 'total',label: 'Total' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={{marginLeft: 18}}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sign, setSign] = React.useState(">");
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  
  return (
    <React.Fragment>
      <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
       <Typography className={classes.title} component="div"></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => props.deleteRows(props.selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={(e) => handleClick(e)}>
          <FilterListIcon color="secondary" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
    <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      elevation={0}
    >
      <MenuItem >
        <TextField
        id="value"
        value={props.searchValue}
        onChange={(e) => props.valueFilters(e.target.value, sign)}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment>
                            <DollarIcon color="secondary" />
                          </InputAdornment>,
          endAdornment: <InputAdornment> 
                          <IconButton color="secondary" onClick={(e) => 
                                    {
                                      props.valueFilters(props.searchValue, sign === ">"? "=" : sign === "=" ? "<" : ">");
                                      setSign(sign === ">"? "=" : sign === "=" ? "<" : ">");
                                    }}>
                              {sign} 
                          </IconButton>
                        </InputAdornment>
        }}
         />
      </MenuItem>
    </Menu>
    </React.Fragment>
    
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchValue, setSearchValue] = React.useState("");
  const [valueFilterRows, setValueFilterRows] = React.useState([]);
  const [chipValue, setChipValue] = React.useState("");
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = props.selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1),
      );
    }

    props.setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (row) => props.selected.indexOf(row) !== -1;

  const switchFilters = () => {
    const { websiteChecked, iOSChecked, androidChecked, softwareChecked } = props;
    const websiteRows = props.rows.filter(row => 
      websiteChecked ? row.service === "Website" : null);
    const iOSRows = props.rows.filter(row => 
      iOSChecked ? row.service === "Mobile" && row.platforms.includes("iOS") : null);
    const androidRows = props.rows.filter(row => 
      androidChecked ? row.service === "Mobile" && row.platforms.includes("Android") : null);
    const softwareRows = props.rows.filter(row => 
      softwareChecked ? row.service === "Custom Software" : null);
    if(!websiteChecked && !iOSChecked && !androidChecked 
      && !softwareChecked) {
        return props.rows;
      }
    else {
      const row0 = websiteRows.concat(iOSRows.filter(row => websiteRows.indexOf(row) < 0));
      const row1 = row0.concat(androidRows.filter(row => row0.indexOf(row) < 0 ));
      const row2 = row1.concat(softwareRows.filter(row => row1.indexOf(row) < 0));
      return row2;
    }
  }

  const valueFilters = (value, sign) => {
      
      setSearchValue(value);
      setChipValue(sign === ">"? `Less than ${value} ` : sign === "=" ? `Equal to ${value}` : `Greater than ${value}` );
      const newRows = props.rows.filter(row => 
                { 
                  return value !== "" ? 
                        eval(`${value} ${sign === "=" ? "===" : sign} ${row.total.substring(1)}`) 
                        : null;
                });
      console.log(newRows);
      setValueFilterRows(newRows);
  }

  return (
    <div className={classes.root} > 
      <Paper className={classes.paper} elevation={0}>
        <EnhancedTableToolbar 
        numSelected={props.selected.length} 
        selected={props.selected}
        deleteRows={props.deleteRows}
        searchValue={searchValue}
        valueFilters={valueFilters}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={props.selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
             
            />
            <TableBody>
              {stableSort((valueFilterRows.length > 0 || searchValue) 
                        ? valueFilterRows 
                        : switchFilters()
                        , getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell align="center">{row.features}</TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platforms}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container justify="flex-end" style={{marginRight: '5em'}}>
        <Grid item>
          {searchValue !== "" ? 
          <Chip label={chipValue} 
            color="primary" 
            onDelete={() => {
              setSearchValue("");
              setValueFilterRows([]);
            }}/> 
          : <span></span>}
        </Grid>
      </Grid>
    </div>
  );
}
