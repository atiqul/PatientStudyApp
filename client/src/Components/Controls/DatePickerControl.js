import MomentUtils from '@date-io/moment'
import { IconButton, InputAdornment } from '@material-ui/core'
import { TodayOutlined } from '@material-ui/icons'
import {
  DatePicker,
  DateTimePicker,  
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React from 'react'

/**
 * @author
 * @function DatePickerControl
 **/

const DatePickerControl = (props) => {
  const {
    name,
    value,
    label,
    onChange,
    format,
    variant = 'inline',
    inputVariant = 'outlined',
    size = 'small',
    ampm = false,
    ...others
  } = props

  const handleOnChange = (date, name) => {
    const obj = {
      target: {
        name,
        value: date.format('YYYY-MM-DDTHH:mm'),
      },
    }
    props.onChange(obj)
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker 
        name={name}
        value={value}
        label={label}
        inputVariant={inputVariant}
        variant={variant}
        onChange={(date) => handleOnChange(date, name)}
        format={format}
        size={size}
        ampm={ampm}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="calander icon">
                <TodayOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...others}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerControl
