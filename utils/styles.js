import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#565044',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  transparentBG: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  mt1: { marginTop: '1rem' },
  menuButton: { padding: 0 },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  searchSection: {
    display: 'flex',
  },
  searchInput: {
    paddingLeft: 5,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '200px',
    },
    width: '500px',
  },
  sort: {
    marginRight: 5,
  },
  iconButton: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#565044',
    },
  },
  chip: {
    display: 'inline-flex',
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    border: 'none',
    cursor: 'default',
    height: 36,
    outline: 'none',
    padding: 0,
    fontSize: 14,
    fontColor: '#333333',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    borderRadius: 16,
    verticalAlign: 'middle',
    textDecoration: 'none',
    justifyContent: 'center',
  },
  chipContent: {
    cursor: 'inherit',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    paddingLeft: 12,
    paddingRight: 12,
  },
  cancelIcon: {
    cursor: 'pointer',
    marginTop: '4px',
  },
}));
export default useStyles;
