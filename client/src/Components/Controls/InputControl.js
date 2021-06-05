import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'

/**
 * @author
 * @function Input
 **/

export default function InputControl(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    variant = 'outlined',
    showVisibilityIcon = false,
    showPassword,
    setShowPassword,
    ...other
  } = props

  

  const handleClickShowPassword = () => {
    setShowPassword((prev)=>!prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const iconAdornment = showVisibilityIcon ?
    {
      endAdornment:(
        <InputAdornment
         position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    } : {}
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={iconAdornment}      
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  )
}
