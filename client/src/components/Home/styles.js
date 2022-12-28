import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  }, 
  buttonSearch: {
    marginBottom: 10,
  },
  pencil : {
    position: 'absolute', 
    top : '25%', 
    right : '2%', 
    borderRadius : '50%', 
    backgroundColor: 'white', 
    width: '3.0rem', 
    height: '3.0rem',
    padding: '1rem', 
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
  },
  dialog: {
    position: 'absolute', 
    right : '10px',
    width : '500px' 
  },
  paper: {
    padding: theme.spacing(2),
  },
  
}));