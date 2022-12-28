import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  dialog: {
    position: 'absolute', 
    right : '10px'
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
  }
}));