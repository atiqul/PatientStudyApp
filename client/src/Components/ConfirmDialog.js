import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { NotListedLocation } from '@material-ui/icons'
import React from 'react'
import ButtonControl from './Controls/ButtonControl'

/**
 * @author Atiqul Alam
 * @function ConfirmDialog
 **/

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleICon: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}))

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()
  return (
    <Dialog
      open={confirmDialog.isOpen || false}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleICon}>
          <NotListedLocation color="secondary" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <ButtonControl
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <ButtonControl
          text="Yes"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
