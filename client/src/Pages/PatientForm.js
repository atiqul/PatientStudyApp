import { makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import moment from "moment";
import { Form, useForm } from '../Components/useForm';
import InputControl from "../Components/Controls/InputControl";
import DatePickerControl from "../Components/Controls/DatePickerControl";
import ButtonControl from "../Components/Controls/ButtonControl";

/**
* @author
* @function PatientForm
**/

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(1),
  },
  alert: {
    fontSize: '1rem',
  },
  alertDanger: {
    color: 'red',
  },
  
}))

const initialFValues = {
  id:0,
  patientId: '',
  firstName: '',
  lastName: '',
  dateOfBirth:moment.utc().format('YYYY-MM-DDTHH:mm').toString()
}

const PatientForm = (props) => {

  const classes = useStyles()
  const { title, addOrEdit, errMsg = null, rowForEdit } = props

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('patientId' in fieldValues) {
      temp.patientId = fieldValues.patientId ? fieldValues.patientId.length > 30 ? 'Maximum limit 30 character' : '' : 'This field is required'
    }
    if ('firstName' in fieldValues) {
      temp.firstName = fieldValues.firstName ? fieldValues.firstName.length > 50 ? 'Maximum limit 50 character' : '' : 'This field is required'
    }
    if ('lastName' in fieldValues) {
      temp.lastName = fieldValues.lastName ? fieldValues.lastName.length > 50 ? 'Maximum limit 50 character' : '' : 'This field is required'
    }
    if ('dateOfBirth' in fieldValues) {
      temp.dateOfBirth = fieldValues.dateOfBirth ? '' : 'This field is required'
    }
    

    setErrors({ ...temp })

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '')
    }
  }


  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialFValues, true, validate)

  useEffect(() => {
    if (rowForEdit) {
      setValues(rowForEdit)
    }
  }, [rowForEdit])

  const handleSubmit = e => {
    e.preventDefault()
    if(validate()){
      addOrEdit(values, resetForm)
    }
  }

  return(
    <div>
      <div className={classes.header}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </div>
      <hr></hr>
      <div className={classes.content}>
        <Form onSubmit={handleSubmit}>
          <InputControl
            name="patientId"
            label="Person Code"
            value={values.patientId}
            onChange={handleInputChange}
            error={errors.patientId}
            disabled={rowForEdit !== null}
          />
          <InputControl
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <InputControl
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <DatePickerControl
            name="dateOfBirth"
            label="Date Of Birth"
            value={values.dateOfBirth}
            format="DD-MM-YYYY"
            onChange={handleInputChange}
          />
          <div>
                <ButtonControl type="submit" text="Submit" />
                {!rowForEdit && <ButtonControl
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />}
              </div>
          </Form>
          {errMsg && (
          <div className="form-group">
            <div
              className={`${classes.alert} ${classes.alertDanger}`}
              role="alert"
            >
              Error: {errMsg}
            </div>
          </div>
        )}
          </div>
    </div>    
    
   )

 }

export default PatientForm