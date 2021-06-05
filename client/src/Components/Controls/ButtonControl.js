import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

/**
 * @author
 * @function ButtonControl
 **/

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}))

const ButtonControl = (props) => {
  const { text, variant, color, size, onClick, ...other } = props
  const classes = useStyles()
  return (
    <Button
      variant={variant || 'contained'}
      color={color || 'primary'}
      size={size || 'large'}
      onClick={onClick}
      classes={{ root: classes.root, label: classes.label }}
      {...other}
    >
      {text}
    </Button>
  )
}

export default ButtonControl
