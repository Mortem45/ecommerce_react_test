import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  media: {
    // height: 260,
    width:'151px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display:'block',
    height: 0,
    paddingTop: '56.25%'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}))