import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWith: '100%'
  },
  media: {
    width:'151px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display:'block',
    height: 0,
    paddingTop: '56.25%'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))