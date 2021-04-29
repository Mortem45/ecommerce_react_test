import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  root2: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    bottom: 25,
    flexDirection: 'column',
  },
  card: {
    marginBottom: 75
  },
}))