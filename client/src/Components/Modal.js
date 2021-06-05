import { IconButton, makeStyles, Modal as MuiModal } from '@material-ui/core'
import { Cancel, CancelOutlined, Close } from '@material-ui/icons'
import React from 'react'

/**
 * @author
 * @function Modal
 **/
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeIcon: {
    position: 'absolute',
    top: -theme.spacing(3),
    right: -theme.spacing(3),
    borderColor: theme.palette.common.black,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
}))

const Modal = (props) => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)

  const { openModal, setOpenModal, children, callback } = props

  const handleModalClose = () => {
    setOpenModal(false)
    callback && callback()
  }

  const onChildComplete = (value) => {
    if (value) {
      handleModalClose()
    }
  }

  return (
    <div>
      <MuiModal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <IconButton
            onClick={handleModalClose}
            className={classes.closeIcon}
            size="medium"
          >
            <Close />
          </IconButton>
          {typeof children === 'function'
            ? children(onChildComplete)
            : children}
        </div>
      </MuiModal>
    </div>
  )
}

export default Modal
